"use client";

import { UserPlus2, UserMinus2 } from "lucide-react";
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
import { TRPCClientError } from "@trpc/client";

export default function DoctorCard({
  doctor,
  user,
  doctorConnection,
}: {
  doctor: UserType;
  user: UserType;
  doctorConnection: DoctorConnection[];
}) {
  const utils = api.useUtils();

  const [loading, setLoading] = useState(false);
  const [conn, setConn] = useState(false);
  const [friend, setFriend] = useState(false);

  useEffect(() => {
    setConn(doctorConnection.some((c) => c.patientId === user.id));
    setFriend(
      doctorConnection.some((c) => c.patientId === user.id && c.accepted),
    );
  }, [doctorConnection, user.id]);

  const createConnection = api.connection.createConnection.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Successfully sent connection request!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
      setConn(true);
    },
    onError: () => {
      toast("Couldn't send connection request!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
    },
    onSettled: async () => {
      setLoading(false);
      await Promise.all([
        utils.connection.getConnections.invalidate(),
        utils.doctor.getDoctors.invalidate(),
      ]);
    },
  });

  const cancelConnection = api.connection.cancelConnection.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast(
        friend === false
          ? "Successfully canceled connection request!"
          : "Successfully removed connection!",
        {
          action: {
            label: "Close",
            onClick: () => {},
          },
        },
      );
      setConn(false);
      setFriend(false);
    },
    onSettled: async () => {
      setLoading(false);
      await Promise.all([
        utils.connection.getConnections.invalidate(),
        utils.doctor.getDoctors.invalidate(),
      ]);
    },
    onError: (err) => {
      const code = err instanceof TRPCClientError ? err.data?.code : undefined;

      if (code === "NOT_FOUND") {
        setConn(false);
        setFriend(false);
        toast("Connection was already canceled.", {
          action: { label: "Close", onClick: () => {} },
        });
        return;
      }

      setConn(true);
      toast.error("Couldn't update connection. Please try again.");
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
          {conn === false && friend === false ? (
            <Button
              variant="outline"
              onClick={() => {
                setLoading(true);
                createConnection.mutate({
                  doctorId: doctor.id,
                  patientId: user.id,
                });
              }}
              disabled={loading}
            >
              <UserPlus2 />
              Send connection request
            </Button>
          ) : conn === true && friend === false ? (
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                cancelConnection.mutate({
                  doctorId: doctor.id,
                  patientId: user.id,
                });
              }}
              disabled={loading}
            >
              <UserMinus2 />
              Cancel connection request
            </Button>
          ) : conn === true && friend === true ? (
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                cancelConnection.mutate({
                  doctorId: doctor.id,
                  patientId: user.id,
                });
              }}
              disabled={loading}
            >
              <UserMinus2 />
              Remove connection
            </Button>
          ) : null}
          <Link href={`finddoctor/${doctor.id}`}>
            <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
              Make appointment
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex w-3/4 flex-row justify-between text-sm">
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
