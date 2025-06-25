"use client";

import {
  Mic,
  MicOff,
  Phone,
  Video,
  VideoOff,
  Minimize,
  Minimize2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "~/lib/utils";
import { usePeerContext } from "~/context/peerContext";

export default function CallOverlay() {
  const { localStream, remoteStream, endCall } = usePeerContext()!;
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMic, setIsMic] = useState(true);
  const [isVideo, setVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefRemote = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (localStream && videoRef.current) {
      videoRef.current.srcObject = localStream;
    }
    if (remoteStream && videoRefRemote.current) {
      videoRefRemote.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  useEffect(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((t) => (t.enabled = isVideo));
    }
  }, [isVideo, localStream]);

  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((t) => (t.enabled = isMic));
    }
  }, [isMic, localStream]);

  return (
    <div
      className={cn(
        "fixed z-50 overflow-hidden rounded-lg bg-gray-800/90 shadow-xl transition-all",
        isMinimized ? "right-4 bottom-4 h-64 w-64" : "inset-0",
      )}
    >
      <Button
        variant="ghost"
        className={cn("absolute z-50", isMinimized ? null : "top-4 left-4")}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? (
          <Minimize className="text-yellow-500" />
        ) : (
          <Minimize2 className="text-yellow-500" />
        )}
      </Button>

      <video
        ref={videoRef}
        className="min-h-full min-w-full border-[3px]"
        autoPlay
        playsInline
      />

      {!isMinimized && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">
          <Button
            variant="outline"
            className={cn(
              "h-14 w-14 rounded-full border-0",
              !isMic && "bg-red-600 hover:bg-red-500",
            )}
            onClick={() => setIsMic(!isMic)}
          >
            {isMic ? <Mic /> : <MicOff className="text-white" />}
          </Button>

          <Button
            variant="outline"
            className={cn(
              "h-14 w-14 rounded-full border-0",
              !isVideo && "bg-red-600 hover:bg-red-500",
            )}
            onClick={() => setVideo(!isVideo)}
          >
            {isVideo ? <Video /> : <VideoOff className="text-white" />}
          </Button>

          <Button
            variant="outline"
            className="h-14 w-14 rounded-full border-0 bg-red-600 hover:bg-red-700"
            onClick={() => {
              endCall();
              videoRef.current = null;
              videoRefRemote.current = null;
            }}
          >
            <Phone className="text-white" />
          </Button>
        </div>
      )}

      {!isMinimized && (
        <video
          ref={videoRefRemote}
          autoPlay
          playsInline
          className="absolute right-4 bottom-4 h-32 w-32 rounded border-[3px]"
        />
      )}
    </div>
  );
}
