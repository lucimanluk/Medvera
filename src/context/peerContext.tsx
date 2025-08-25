"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Peer, { DataConnection, MediaConnection } from "peerjs";
import { toast } from "sonner";

interface CallRequest {
  type: "call-request";
  from: string;
  name: string;
  appointmentId: string;
}

interface CallAccept {
  type: "call-accept";
  from: string;
  name: string;
  appointmentId: string;
}

interface CallClosed {
  type: "call-closed";
  from: string;
  name: string;
  appointmentId: string;
}

interface PeerContextValue {
  peer: Peer | null;
  inCall: boolean;
  setInCall: (inCall: boolean) => void;
  startCall: (remoteId: string) => void;
  endCall: (notify?: boolean) => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

export const PeerContext = createContext<PeerContextValue>({
  peer: null,
  inCall: false,
  setInCall: () => {},
  startCall: () => {},
  endCall: () => {},
  localStream: null,
  remoteStream: null,
});

export const PeerContextProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const peerRef = useRef<Peer | null>(null);
  const dataConnRef = useRef<DataConnection | null>(null);
  const mediaCallRef = useRef<MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const endCall = (notify = true) => {
    if (notify && dataConnRef.current?.open) {
      try {
        dataConnRef.current.send({
          type: "call-closed",
          from: id,
          name: id,
        } as CallClosed);
      } catch {}
    }

    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (remoteStreamRef.current) {
        remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    } catch {}

    try {
      mediaCallRef.current?.close();
    } catch {}
    try {
      dataConnRef.current?.close();
    } catch {}

    mediaCallRef.current = null;
    dataConnRef.current = null;
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setInCall(false);
  };

  const getBestLocalStream = async (): Promise<MediaStream> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCam = devices.some((d) => d.kind === "videoinput");
    const hasMic = devices.some((d) => d.kind === "audioinput");
    if (!hasCam && !hasMic) {
      return new MediaStream();
    }
    const constraints: MediaStreamConstraints = {
      video: hasCam ? true : false,
      audio: hasMic ? true : false,
    };
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch {
      if (hasCam) {
        const cams = devices.filter((d) => d.kind === "videoinput");
        for (const cam of cams) {
          try {
            return await navigator.mediaDevices.getUserMedia({
              video: { deviceId: { exact: cam.deviceId } },
              audio: hasMic ? true : false,
            });
          } catch {}
        }
      }
      return new MediaStream();
    }
  };

  const startCall = (remoteId: string) => {
    if (!peerRef.current) return;
    (async () => {
      try {
        const stream = await getBestLocalStream();
        localStreamRef.current = stream;
        setLocalStream(stream);
        const mc = peerRef.current!.call(remoteId, stream);
        if (!mc) throw new Error("Failed to create MediaConnection");
        mediaCallRef.current = mc;
        mc.on("stream", (remote) => {
          remoteStreamRef.current = remote;
          setRemoteStream(remote);
        });
        mc.on("close", () => {
          if (mediaCallRef.current === mc) mediaCallRef.current = null;
          endCall(false);
        });
        mc.on("error", () => {
          if (mediaCallRef.current === mc) mediaCallRef.current = null;
          endCall(false);
        });
        setInCall(true);
      } catch (e) {
        toast.error("Could not start call.");
        console.error(e);
      }
    })();
  };

  function attachDataHandlers(conn: DataConnection) {
    dataConnRef.current = conn;
    conn.on("close", () => {
      if (dataConnRef.current === conn) dataConnRef.current = null;
    });
    conn.on("error", () => {
      if (dataConnRef.current === conn) dataConnRef.current = null;
    });
    conn.on("data", (raw) => {
      const data = typeof raw === "object" ? (raw as any) : null;
      if (!data?.type) return;
      if (data.type === "call-request") {
        const { from, name } = data as CallRequest;
        toast(`${name} is calling`, {
          duration: 45000,
          cancel: { label: "Decline", onClick: () => conn.close() },
          action: {
            label: "Answer",
            onClick: () => {
              conn.send({
                type: "call-accept",
                from: id,
                name: id,
              });
            },
          },
        });
      }
      if (data.type === "call-accept") {
        startCall((data as CallAccept).from);
        conn.send({
          type: "call-accepted",
          from: id,
          name: id,
        });
      }
      if (data.type === "call-closed") {
        endCall(false);
      }
    });
  }

  useEffect(() => {
    if (!id || peerRef.current) return;
    const peer = new Peer(id);
    peerRef.current = peer;
    peer.on("open", () => setReady(true));
    peer.on("error", (err) => console.error(err));
    return () => {
      peerRef.current?.destroy();
      peerRef.current = null;
      setReady(false);
    };
  }, [id]);

  useEffect(() => {
    if (!ready || !peerRef.current) return;
    const onDataConn = (conn: DataConnection) => {
      attachDataHandlers(conn);
    };
    peerRef.current.on("connection", onDataConn);
    return () => {
      peerRef.current?.off("connection", onDataConn);
    };
  }, [ready, id]);

  useEffect(() => {
    if (!ready || !peerRef.current) return;
    const onMediaCall = (call: MediaConnection) => {
      (async () => {
        try {
          const stream = await getBestLocalStream();
          localStreamRef.current = stream;
          setLocalStream(stream);
          mediaCallRef.current = call;
          call.answer(stream);
          call.on("stream", (remote) => {
            remoteStreamRef.current = remote;
            setRemoteStream(remote);
          });
          call.on("close", () => {
            if (mediaCallRef.current === call) mediaCallRef.current = null;
            endCall(false);
          });
          call.on("error", () => {
            if (mediaCallRef.current === call) mediaCallRef.current = null;
            endCall(false);
          });
          setInCall(true);
        } catch (e) {
          toast.error("Could not answer call.");
          console.error(e);
          try {
            call.close();
          } catch {}
        }
      })();
    };
    peerRef.current.on("call", onMediaCall);
    return () => {
      peerRef.current?.off("call", onMediaCall);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const onLeave = () => {
      try {
        if (dataConnRef.current?.open) {
          dataConnRef.current.send({ type: "call-closed", from: id, name: id });
        }
      } catch {}
      endCall(false);
    };

    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [ready, id]);

  if (!ready) return null;

  return (
    <PeerContext.Provider
      value={{
        peer: peerRef.current,
        inCall,
        setInCall,
        startCall,
        endCall,
        localStream,
        remoteStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export function usePeerContext() {
  return useContext(PeerContext);
}
