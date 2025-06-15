"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export const PeerContext = createContext<Peer | null>(null);

export const PeerContextProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const peerRef = useRef<Peer | null>(null);
  //Acest [ready, setReady] useState verifica daca s-a incarcat peer-ul.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!id || peerRef.current) return;

    const peer = new Peer(id);
    peerRef.current = peer;

    peer.on("open", () => {
      setReady(true);
    });

    peer.on("error", (err) => {
      console.error("Peer error", err);
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
        setReady(false);
      }
    };
  }, [id]);

  

  if (!ready) return null;
  return (
    <PeerContext.Provider value={peerRef.current}>
      {children}
    </PeerContext.Provider>
  );
};

export function usePeerContext() {
  return useContext(PeerContext);
}
