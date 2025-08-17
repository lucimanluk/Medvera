"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Check, X, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { User as UserType } from "~/types/user";
import { api } from "~/trpc/react";
import type { DoctorConnection } from "~/types/connection";

export default function ConnectionCard({
  type,
  connection,
  user,
}: {
  type: string;
  connection: DoctorConnection;
  user: UserType;
}) {
  const utils = api.useUtils();
  const acceptMutation = api.connection.acceptConnection.useMutation({
    onSuccess: () => {
      utils.connection.getConnections.invalidate();
      utils.doctor.getDoctors.invalidate();
      utils.connection.getPrescriptionConnections.invalidate();
    },
  });
  const declineMutation = api.connection.declineConnection.useMutation({
    onSuccess: () => {
      utils.connection.getConnections.invalidate();
      utils.doctor.getDoctors.invalidate();
    },
  });
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              user.doctor === false
                ? connection.doctor.image || "/default_pfp.jpg"
                : connection.patient.image || "/default_pfp.jpg"
            }
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>
              {user.doctor === false
                ? connection.doctor.name
                : connection.patient.name}
            </CardTitle>
            <CardDescription>
              {user.doctor === false ? (
                connection.doctor.doctorProfile?.specialization
              ) : (
                <p>patient</p>
              )}
            </CardDescription>
          </div>
        </div>
        {type === "request" && user.doctor ? (
          <div className="flex flex-row gap-2">
            <Button variant="outline">
              <Eye />
              View details
            </Button>
            <Button
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              onClick={() => {
                acceptMutation.mutate({ id: connection.id });
              }}
            >
              <Check />
              Accept
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
              onClick={() => declineMutation.mutate({ id: connection.id })}
            >
              <X />
              Decline
            </Button>
          </div>
        ) : type === "request" && user.doctor === false ? (
          <Button variant="outline">
            <Eye />
            View details
          </Button>
        ) : type === "connection" ? (
          <Button variant="outline">
            <Eye />
            View details
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="flex w-3/4 justify-between text-sm">
        <span>
          Email:{" "}
          {user.doctor ? connection.patient.email : connection.doctor.email}
        </span>
        <span>
          {user.doctor ? (
            <>
              <span>Phone number: </span>
              {connection.patient.patientProfile?.phoneNumber}
            </>
          ) : (
            <>
              <span>Cabinet phone number: </span>
              {connection.doctor.doctorProfile?.cabinetPhone}
            </>
          )}
        </span>
        <span>
          {user.doctor ? (
            <>
              <span>Emergency contact: </span>
              {connection.patient.patientProfile?.emergencyPhone}
            </>
          ) : (
            <>
              <span>Cabinet address: </span>
              {connection.doctor.doctorProfile?.cabinetAddress}
            </>
          )}
        </span>
        <span>
          {user.doctor ? (
            <>
              <span>Family doctor phone number: </span>
              {connection.patient.patientProfile?.familyDoctorPhone}
            </>
          ) : (
            <>
              <span>Cabinet city: </span>
              {connection.doctor.doctorProfile?.cabinetCity}
            </>
          )}
        </span>
      </CardContent>
    </Card>
  );
}
