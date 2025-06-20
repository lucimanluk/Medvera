"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import { toast } from "sonner";

export const PeerContext = createContext<PeerContext>({
  peer: null,
  inCall: false,
  setInCall: () => {},
});

type CallRequest = {
  type: "call-request";
  from: string;
  name: string;
  appointmentId: string;
};

type PeerContext = {
  peer: Peer | null;
  inCall: boolean;
  setInCall: (value: boolean) => void;
};

type CallAccept = {
  type: "call-accept";
  from: string;
  name: string;
  appointmendId: string;
};

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

  useEffect(() => {
    if (!id || peerRef.current) return;
    const peer = new Peer(id);
    peerRef.current = peer;

    peer.on("open", () => setReady(true));
    peer.on("error", (err) => console.error("Peer error", err));

    return () => {
      peerRef.current?.destroy();
      peerRef.current = null;
      setReady(false);
    };
  }, [id]);

  useEffect(() => {
    const peer = peerRef.current;
    if (!peer || !ready) return;

    peer.removeAllListeners("connection");

    const onConnection = (conn: DataConnection) => {
      conn.on("data", (data: unknown) => {
        if (
          typeof data === "object" &&
          data !== null &&
          (data as any).type === "call-request"
        ) {
          const { name } = data as CallRequest;
          toast(`${name} is calling`, {
            duration: 45_000,
            cancel: { label: "Decline", onClick: () => {} },
            action: {
              label: "Answer",
              onClick: () => {
                conn.send({
                  type: "call-accept",
                  from: id,
                  name: id,
                  appointmentId: id,
                });
                setInCall(true);
              },
            },
          });
        }
      });
    };

    peer.on("connection", onConnection);
    return () => {
      peer.off("connection", onConnection);
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <PeerContext.Provider value={{ peer: peerRef.current, inCall, setInCall }}>
      {children}
    </PeerContext.Provider>
  );
};

export function usePeerContext() {
  return useContext(PeerContext);
}
