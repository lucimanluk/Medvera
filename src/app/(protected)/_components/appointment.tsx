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
import Peer from "peerjs";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CallRequest = {
  type: "call-request";
  from: string;
  name: string;
  appointmentId: string;
};

export default function Appointment({
  props,
  user,
  peer,
}: {
  props: AppointmentType;
  user: User;
  peer: Peer;
}) {
  const router = useRouter();
  const apptDateObj = new Date(props.appointmentDate);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
  ) {
    return null;
  }

  const remotePeerIdRef = useRef<string>(
    peer.id === props.patient.id ? props.doctor.id : props.patient.id,
  );

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

  useEffect(() => {
    peer.on("connection", (conn) => {
      conn.on("data", (data: unknown) => {
        if (
          typeof data === "object" &&
          data !== null &&
          "type" in data &&
          (data as any).type === "call-request"
        ) {
          const request = data as CallRequest;
          toast(`${request.name} is calling`, {
            duration: 45_000,
            description: `Age: 29, height: 1.90m`,
            cancel: {
              label: "Decline",
              onClick: () => {
                // logic
              },
            },
            action: {
              label: "Answer",
              onClick: () => {
                conn.send({
                  type: "call-accept",
                  name: user.name,
                });
                router.push("/dashboard");
              },
            },
          });
        }
      });
    });
  }, [peer, user.name]);

  const handleJoinCall = () => {
    const remoteId = remotePeerIdRef.current;
    if (!remoteId) return;
    const conn = peer.connect(remoteId);
    conn.on("open", () => {
      conn.send({
        type: "call-request",
        from: user.id,
        name: user.name,
        appointmentId: props.id,
      });
      router.push("/dashboard");
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>
              {user.id === props.patient.id
                ? props.doctor.name
                : props.patient.name}
            </CardTitle>
            <CardDescription>
              {user.id === props.patient.id ? (
                <span>{props.doctor.name}</span>
              ) : (
                <span>varsta si gender</span>
              )}
            </CardDescription>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Button variant="outline">
            <Shuffle />
            Reschedule
          </Button>

          {isCallTime ? (
            <Button
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              onClick={handleJoinCall}
            >
              <PhoneCall />
              Join call
            </Button>
          ) : (
            <Button variant="outline" disabled>
              <PhoneCall />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex w-3/4 flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <Calendar width={18} height={18} />
          {apptDateObj.toDateString()}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Clock width={18} height={18} />
          {apptDateObj.toTimeString().split("GMT")[0]}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Video width={18} height={18} />
          {props.patient.name}
        </div>
      </CardContent>
    </Card>
  );
}
