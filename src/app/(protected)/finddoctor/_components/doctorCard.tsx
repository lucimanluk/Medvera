"use client";

import { Calendar, Clock, Video, UserPlus2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { User as UserType } from "~/types/user";
import Link from "next/link";
import type { DoctorConnection } from "~/types/connection";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function DoctorCard({
  doctor,
  user,
  doctorConnection,
}: {
  doctor: UserType;
  user: UserType;
  doctorConnection: DoctorConnection[];
}) {
  const [conn, setConn] = useState(false);
  useEffect(() => {
    setConn(doctorConnection.some((c) => c.patientId === user.id));
  }, [doctorConnection, user.id]);

  const createConnection = api.connection.createConnection.useMutation({
    onSuccess: () => {
      toast("Successfully sent connection!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
      setConn(true);
    },
  });
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <img
            src={doctor.image || "/default_pfp.jpg"}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>{doctor.name}</CardTitle>
            <CardDescription>
              {doctor.doctorProfile?.specialization}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          {conn === false ? (
            <Button
              variant="outline"
              onClick={() => {
                createConnection.mutate({
                  doctorId: doctor.id,
                  patientId: user.id,
                });
              }}
            >
              <UserPlus2 />
              Send connection request
            </Button>
          ) : (
            <Button variant="outline" className="bg-gray-100">
              <UserPlus2 />
              Connection request sent
            </Button>
          )}

          <Link href={`finddoctor/${doctor.id}`}>
            <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
              Make appointment
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex w-3/4 flex-row justify-between text-sm">
        <div className="g-2 flex flex-row items-center">
          <p>Email: {doctor.email}</p>
        </div>
        <div className="g-2 flex flex-row items-center">
          <p>
            Appointment duration: {doctor.doctorProfile?.appointmentDuration}
            <span>minutes</span>
          </p>
        </div>
        <div className="g-2 flex flex-row items-center">
          <p>
            Appointment price: {doctor.doctorProfile?.appointmentPrice}
            <span>RON</span>
          </p>
        </div>
        <div className="g-2 flex flex-row items-center">
          <p>Cabinet phone number: {doctor.doctorProfile?.cabinetPhone}</p>
        </div>
        <div className="g-2 flex flex-row items-center">
          <p>Cabinet location: {doctor.doctorProfile?.cabinetCity}</p>
        </div>
      </CardContent>
    </Card>
  );
}
