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
import { useState, useRef } from "react";

export default function Call() {
  const [isminimized, setIsMinimized] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // this callback runs once when the <video> mounts
  const setVideoElement = (el: HTMLVideoElement | null) => {
    if (!el) return;

    videoRef.current = el;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        el.srcObject = stream;
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });
  };

  return (
    <div className="relative h-full w-full bg-blue-400">
      <video
        ref={setVideoElement}
        className="h-screen w-full border-[3px] bg-red-400"
        autoPlay
        playsInline
      />
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform flex-row items-center gap-4">
        <Button variant={"outline"} className="h-14 w-14 rounded-full border-0">
          <Mic />
        </Button>
        <Button variant={"outline"} className="h-14 w-14 rounded-full border-0">
          <Video />
        </Button>
        <Button
          variant={"outline"}
          className="h-14 w-14 rounded-full border-0 bg-red-600 hover:bg-red-700"
        >
          <Phone className="text-white" />
        </Button>
      </div>
    </div>
  );
}
