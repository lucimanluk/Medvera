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

interface CallAccepted {
  type: "call-accepted";
  from: string;
  name: string;
  appointmentId: string;
}

interface PeerContextValue {
  peer: Peer | null;
  inCall: boolean;
  setInCall: (inCall: boolean) => void;
  startCall: (remoteId: string) => void;
  endCall: () => void;
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
  const [ready, setReady] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const endCall = () => {
    setInCall(false);
    localStream?.getTracks().forEach((t) => t.stop());
    setLocalStream(null);
    setRemoteStream(null);
  };

  const getIndexedStream = async (): Promise<MediaStream> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cams = devices.filter((d) => d.kind === "videoinput");
    for (const cam of cams) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: cam.deviceId } },
          audio: true,
        });
        return stream;
      } catch {
        continue;
      }
    }
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  };

  const startCall = (remoteId: string) => {
    if (!peerRef.current) return;
    setInCall(true);
    getIndexedStream()
      .then((stream) => {
        setLocalStream(stream);
        const mc = peerRef.current!.call(remoteId, stream);
        mc.on("stream", (remote) => setRemoteStream(remote));
        mc.on("close", endCall);
        mc.on("error", endCall);
      })
      .catch(() => {
        const mc = peerRef.current!.call(remoteId, undefined as any);
        mc.on("stream", (remote) => setRemoteStream(remote));
        mc.on("close", endCall);
        mc.on("error", endCall);
      });
  };

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
      conn.on("data", (data) => {
        if (typeof data === "object" && (data as any).type === "call-request") {
          const { from, name } = data as CallRequest;
          toast(`${name} ${from} is calling`, {
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
        if (typeof data === "object" && (data as any).type === "call-accept") {
          startCall((data as CallAccept).from);
          conn.send({
            type: "call-accepted",
            from: id,
            name: id,
          });
        }
      });
    };
    peerRef.current.on("connection", onDataConn);
    return () => {
      peerRef.current?.off("connection", onDataConn);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready || !peerRef.current) return;
    const onMediaCall = (call: MediaConnection) => {
      setInCall(true);
      getIndexedStream()
        .then((stream) => {
          setLocalStream(stream);
          call.answer(stream);
          call.on("stream", (remote) => setRemoteStream(remote));
          call.on("close", endCall);
          call.on("error", endCall);
        })
        .catch(() => {
          call.answer(undefined as any);
          call.on("stream", (remote) => setRemoteStream(remote));
          call.on("close", endCall);
          call.on("error", endCall);
        });
    };
    peerRef.current.on("call", onMediaCall);
    return () => {
      peerRef.current?.off("call", onMediaCall);
    };
  }, [ready]);

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
