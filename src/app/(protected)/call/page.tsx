"use client";

import { Mic, MicOff, Phone, Video, VideoOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function Call() {
  const [isminimized, setIsMinimized] = useState(false);

  return (
    <div className="relative h-full w-full bg-blue-400">
      <video className="h-full w-full border-[3px] bg-red-400"></video>
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
