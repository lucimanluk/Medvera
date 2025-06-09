"use client";

import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import type { MediaConnection } from "peerjs";
import { useSession } from "~/lib/auth-client";

export default function CallPage() {
  const { data: session, isPending } = useSession();
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(
    null,
  );

  // States for available cameras and the selected device
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);

  // Enumerate video input devices on mount
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setCameras(videoDevices);
        if (videoDevices[0]) setSelectedCameraId(videoDevices[0].deviceId);
      })
      .catch((err) => console.error("Error enumerating devices:", err));
  }, []);

  // Initialize PeerJS
  useEffect(() => {
    if (!session?.user?.id) return;

    const peer = new Peer(session.user.id);
    peer.on("open", (id) => setPeerId(id));
    peer.on("call", (call) => setIncomingCall(call));
    peer.on("error", (err) => console.error("PeerJS error:", err));

    peerRef.current = peer;
    return () => {
      void peer.destroy();
    };
  }, [session?.user?.id]);

  // Helper to get local media with selected camera
  const getLocalStream = async () => {
    return navigator.mediaDevices.getUserMedia({
      video: selectedCameraId
        ? { deviceId: { exact: selectedCameraId } }
        : true,
      audio: true,
    });
  };

  // Accept incoming call
  const acceptCall = async () => {
    if (!incomingCall) return;
    try {
      const stream = await getLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        void localVideoRef.current.play();
      }

      // Attach remote stream handler before answering
      incomingCall.on("stream", (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          void remoteVideoRef.current.play();
        }
      });

      incomingCall.answer(stream);
    } catch (err) {
      console.error("Error accepting call:", err);
    }
    setIncomingCall(null);
  };

  // Reject incoming call
  const rejectCall = () => {
    incomingCall?.close();
    setIncomingCall(null);
  };

  // Start a new call
  const startCall = async () => {
    if (!peerRef.current || peerRef.current.disconnected) {
      console.warn("Peer is not ready yet");
      return;
    }
    if (!remoteId) {
      alert("Please enter a Peer ID to call");
      return;
    }

    try {
      const stream = await getLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        void localVideoRef.current.play();
      }

      const call = peerRef.current.call(remoteId, stream);
      if (!call) {
        console.error("Failed to create call — check connection & remoteId");
        return;
      }

      call.on("stream", (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          void remoteVideoRef.current.play();
        }
      });

      call.on("error", (err) => console.error("Call error:", err));
    } catch (err) {
      console.error("Error getting user media or starting call:", err);
    }
  };

  if (isPending) return <p>Se încarcă sesiunea...</p>;
  if (!session?.user)
    return (
      <p>🔒 Trebuie să fii autentificat pentru a folosi apelurile video.</p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Apel Video</h1>
      <p>
        👤 Ești logat ca:{" "}
        <strong>{session.user.name || session.user.id}</strong>
      </p>
      <p>
        🔗 ID-ul tău Peer: <code>{peerId}</code>
      </p>

      {/* Camera selector */}
      <select
        value={selectedCameraId}
        onChange={(e) => setSelectedCameraId(e.target.value)}
        className="mt-2 w-full border p-2"
      >
        {cameras.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label || cam.deviceId}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="ID Peer de apelat"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        className="mt-2 w-full border p-2"
      />
      <button
        onClick={() => void startCall()}
        disabled={!peerId || !remoteId}
        className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Sună
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h2>🎥 Video Local</h2>
          <video ref={localVideoRef} autoPlay muted className="w-full border" />
        </div>
        <div>
          <h2>📺 Video Distant</h2>
          <video ref={remoteVideoRef} autoPlay className="w-full border" />
        </div>
      </div>

      {incomingCall && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="max-w-sm space-y-4 rounded bg-white p-6 text-center shadow">
            <h2 className="text-xl font-bold">📞 Apel primit</h2>
            <p>
              De la: <code>{incomingCall.peer}</code>
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => void acceptCall()}
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Acceptă
              </button>
              <button
                onClick={rejectCall}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Respinge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
