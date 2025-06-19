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

export default function CallOverlay() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMic, setIsMic] = useState(true);
  const [isVideo, setVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initStream = async () => {
      streamRef.current?.getTracks().forEach((t) => {
        t.stop();
      });

      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error getting tracks");
        });
    };

    initStream();

    navigator.mediaDevices.addEventListener("devicechange", initStream);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", initStream);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    const videoTracks = streamRef.current;
    if (!videoTracks) return;
    videoTracks.getVideoTracks().forEach((track) => {
      track.enabled = isVideo;
    });
  }, [isVideo]);

  useEffect(() => {
    const micTracks = streamRef.current;
    if (!micTracks) return;
    micTracks?.getAudioTracks().forEach((track) => {
      track.enabled = isMic;
    });
  }, [isMic]);

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
        onClick={() => {
          setIsMinimized(!isMinimized);
        }}
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
      {isMinimized === false ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform flex-row items-center gap-4">
          <Button
            variant={"outline"}
            className={cn(
              "h-14 w-14 rounded-full border-0",
              isMic === false ? "bg-red-600 hover:bg-red-500" : null,
            )}
            onClick={() => {
              setIsMic(!isMic);
            }}
          >
            {isMic ? <Mic /> : <MicOff className="text-white"/>}
          </Button>
          <Button
            variant={"outline"}
            className={cn(
              "h-14 w-14 rounded-full border-0",
              isVideo === false ? "bg-red-600 hover:bg-red-500" : null,
            )}
            onClick={() => {
              setVideo(!isVideo);
            }}
          >
            {isVideo ? <Video /> : <VideoOff className="text-white" />}
          </Button>
          <Button
            variant={"outline"}
            className="h-14 w-14 rounded-full border-0 bg-red-600 hover:bg-red-700"
          >
            <Phone className="text-white" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
