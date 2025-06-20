"use client";

import { Calendar, Clock, Video, PhoneCall, Shuffle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { Appointment as AppointmentType } from "~/types/appointment";
import type { User } from "~/types/user";
import { useEffect, useState, useRef } from "react";
import { usePeerContext } from "~/context/peerContext";
import { toast } from "sonner";

export default function Appointment({
  props,
  user,
}: {
  props: AppointmentType;
  user: User;
}) {
  const peer = usePeerContext()!;
  const apptDateObj = new Date(props.appointmentDate);
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  const apptDateOnly = new Date(
    apptDateObj.getFullYear(),
    apptDateObj.getMonth(),
    apptDateObj.getDate(),
  );
  if (apptDateOnly < today) return null;

  const apptTs = apptDateObj.getTime();
  const appointmentEndTs = apptTs + 60 * 60 * 1000;
  if (
    apptDateOnly.getTime() === today.getTime() &&
    Date.now() > appointmentEndTs
  )
    return null;

  const [isCallTime, setIsCallTime] = useState(false);
  useEffect(() => {
    const checkTime = () => {
      const nowTs = Date.now();
      const joinWindowStart = apptTs - 10 * 60 * 1000;
      setIsCallTime(nowTs >= joinWindowStart && nowTs <= appointmentEndTs);
    };
    checkTime();
    const tid = setInterval(checkTime, 30_000);
    return () => clearInterval(tid);
  }, [props.appointmentDate]);

  const remotePeerId =
    peer.peer?.id === props.patient.id ? props.doctor.id : props.patient.id;
  const handleJoinCall = () => {
    peer.peer?.once("error", (err: any) => {
      if (err.type === "peer-unavailable") {
        toast(`User isn't online`, {
          description: "Wait for them to come back online",
          duration: 5_000,
          cancel: { label: "Close", onClick: () => {} },
        });
      }
    });
    const conn = peer.peer?.connect(remotePeerId);
    conn?.on("open", () => {
      conn.send({
        type: "call-request",
        from: user.id,
        name: user.name,
        appointmentId: props.id,
      });
    });
    conn?.on("data", (data: unknown) => {
      peer.setInCall(true);
    });
    conn?.on("error", () => {
      toast(`Couldn't connect to user`, {
        description: "There was an error calling the user.",
        duration: 5_000,
        cancel: { label: "Close", onClick: () => {} },
      });
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>
              {user.id === props.patient.id
                ? props.doctor.name
                : props.patient.name}
            </CardTitle>
            <CardDescription>
              {user.id === props.patient.id
                ? props.doctor.name
                : "varsta si gender"}
            </CardDescription>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Shuffle />
            Reschedule
          </Button>
          {isCallTime && peer.inCall === false ? (
            <Button
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              onClick={handleJoinCall}
            >
              <PhoneCall />
              Join call
            </Button>
          ) : isCallTime && peer.inCall === true ? (
            <Button variant="outline" disabled>
              <PhoneCall />
              In call
            </Button>
          ) : isCallTime === false && peer.inCall === false ? (
            <Button variant="outline" disabled>
              <PhoneCall />
              Call at {props.appointmentDate.toTimeString().split("GMT")[0]}
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex w-3/4 justify-between">
        <div className="flex items-center gap-2">
          <Calendar width={18} height={18} />
          {apptDateObj.toDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Clock width={18} height={18} />
          {apptDateObj.toTimeString().split("GMT")[0]}
        </div>
        <div className="flex items-center gap-2">
          <Video width={18} height={18} />
          {props.patient.name}
        </div>
      </CardContent>
    </Card>
  );
}
