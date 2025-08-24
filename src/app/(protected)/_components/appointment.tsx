"use client";

import { Calendar, Clock, Banknote, PhoneCall, Hourglass } from "lucide-react";
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
import Image from "next/image";
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

  useEffect(() => {
    const check = () => {
      const now = new Date();
      setIsCallTime(now <= apptDateObj);
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
        startCall((data as any).from);
      }
    });
    conn?.on("error", () => {
      toast.error("Couldn't connect to user", { duration: 5000 });
    });
  };

  return (
    <Card className="mb-2">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 self-center overflow-hidden rounded-full">
            <Image
              src={
                user.id === appointment.patient.id
                  ? appointment.doctor.doctorProfile?.image ||
                    "/default_pfp.jpg"
                  : appointment.patient.patientProfile?.image ||
                    "/default_pfp.jpg"
              }
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <CardTitle>
              {user.id === appointment.patient.id
                ? `${appointment.doctor.doctorProfile?.firstName} ${appointment.doctor.doctorProfile?.lastName}`
                : `${appointment.patient.patientProfile?.firstName} ${appointment.patient.patientProfile?.lastName}`}
            </CardTitle>
            <CardDescription>
              {user.doctor == false
                ? appointment.doctor.doctorProfile?.specialization
                : "Care Recipient"}
            </CardDescription>
          </div>
        </div>
        {type === "upcoming" ? (
          <div className="flex gap-4">
            <Button
              onClick={handleJoinCall}
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              disabled={inCall || isCallTime}
            >
              <PhoneCall /> Join call
            </Button>
          </div>
        ) : null}
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
          <Banknote width={18} height={18} />
          {appointment.appointmentPrice} lei
        </div>
        <div className="flex items-center gap-2">
          <Hourglass width={18} height={18} />
          {appointment.appointmentDuration} minutes
        </div>
      </CardContent>
    </Card>
  );
}
