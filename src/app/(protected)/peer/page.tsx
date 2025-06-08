'use client';

import { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import { useSession } from '~/lib/auth-client';

export default function CallPage() {
  const { data: session, isPending } = useSession();
  const [peerId, setPeerId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const peer = new Peer(session.user.id, {
      host: 'peerjs.com',
      port: 443,
      secure: true,
    });

    peer.on('open', id => setPeerId(id));

    peer.on('call', (call) => {
      setIncomingCall(call);
    });

    peerRef.current = peer;

    return () => {
      peer.destroy();
    };
  }, [session?.user?.id]);

  const acceptCall = async () => {
    if (!incomingCall) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play();
    }

    incomingCall.answer(stream);
    incomingCall.on('stream', (remoteStream: MediaStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      }
    });

    setIncomingCall(null);
  };

  const rejectCall = () => {
    incomingCall?.close();
    setIncomingCall(null);
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play();
    }

    const call = peerRef.current!.call(remoteId, stream);
    call.on('stream', (remoteStream: MediaStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      }
    });
  };

  if (isPending) return <p>Se încarcă sesiunea...</p>;
  if (!session?.user) return <p>🔒 Trebuie să fii autentificat pentru a folosi apelurile video.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Apel Video</h1>
      <p>👤 Ești logat ca: <strong>{session.user.name || session.user.id}</strong></p>
      <p>🔗 ID-ul tău Peer: <code>{peerId}</code></p>

      <input
        type="text"
        placeholder="ID Peer de apelat"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        className="border p-2 mt-2 w-full"
      />
      <button
        onClick={startCall}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Suna
      </button>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h2>🎥 Video Local</h2>
          <video ref={localVideoRef} autoPlay muted className="w-full border" />
        </div>
        <div>
          <h2>📺 Video Distant</h2>
          <video ref={remoteVideoRef} autoPlay className="w-full border" />
        </div>
      </div>

      {/* Modal pentru apel primit */}
      {incomingCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow space-y-4 max-w-sm text-center">
            <h2 className="text-xl font-bold">📞 Apel primit</h2>
            <p>De la: <code>{incomingCall.peer}</code></p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={acceptCall} className="bg-green-600 text-white px-4 py-2 rounded">
                Acceptă
              </button>
              <button onClick={rejectCall} className="bg-red-600 text-white px-4 py-2 rounded">
                Respinge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
