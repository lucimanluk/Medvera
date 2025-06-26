"use client";

import { Calendar, Clock, Video, PhoneCall } from "lucide-react";
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
import { useEffect, useState } from "react";
import { usePeerContext } from "~/context/peerContext";
import { toast } from "sonner";

export default function Appointment({
  appointment,
  user,
  type,
}: {
  appointment: AppointmentType;
  user: User;
  type: string;
}) {
  const { peer, startCall, inCall } = usePeerContext()!;
  const [isCallTime, setIsCallTime] = useState(false);
  const apptDateObj = new Date(appointment.appointmentDate);
  const apptTs = apptDateObj.getTime();
  const appointmentEndTs = apptTs + 60 * 60 * 1000;

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      setIsCallTime(now >= apptTs - 600000 && now <= appointmentEndTs);
    };
    check();
    const tid = setInterval(check, 30000);
    return () => clearInterval(tid);
  }, [appointment.appointmentDate]);

  const remotePeerId =
    user.id === appointment.patient.id
      ? appointment.doctor.id
      : appointment.patient.id;

  const handleJoinCall = () => {
    const conn = peer?.connect(remotePeerId);
    conn?.on("open", () => {
      conn.send({
        type: "call-request",
        from: user.id,
        name: user.name,
        appointmentId: appointment.id,
      });
    });
    conn?.on("data", (data: unknown) => {
      if (typeof data === "object" && (data as any).type === "call-accept") {
        startCall(remotePeerId);
      }
    });
    conn?.on("error", () => {
      toast.error("Couldn't connect to user", { duration: 5000 });
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>
              {user.id === appointment.patient.id
                ? appointment.doctor.name
                : appointment.patient.name}
            </CardTitle>
            <CardDescription>
              {user.id === appointment.patient.id ? "specialitate" : "patient"}
            </CardDescription>
          </div>
        </div>
        <div className="flex gap-4">
          {isCallTime && !inCall && (
            <Button
              onClick={handleJoinCall}
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
            >
              <PhoneCall /> Join call
            </Button>
          )}
          {inCall && (
            <Button variant="outline" disabled={true}>
              <PhoneCall /> In call
            </Button>
          )}
          {!isCallTime && !inCall && (
            <Button variant="outline" disabled>
              <PhoneCall /> Call at {apptDateObj.toTimeString().split("GMT")[0]}
            </Button>
          )}
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
          Video call
        </div>
      </CardContent>
    </Card>
  );
}
