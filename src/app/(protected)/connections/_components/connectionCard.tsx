"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Check, X, Eye, UserMinus2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import type { User as UserType } from "~/types/user";
import type { DoctorConnection } from "~/types/connection";
import { api } from "~/trpc/react";
import { useState } from "react";
import Image from "next/image";
import PatientDialog from "./patientDialog";
import DoctorDialog from "./doctorDialog";
import { TRPCClientError } from "@trpc/client";

export default function ConnectionCard({
  type,
  connection,
  user,
}: {
  type: string;
  connection: DoctorConnection;
  user: UserType;
}) {
  const [loading, setLoading] = useState(false);
  const utils = api.useUtils();

  const acceptMutation = api.connection.acceptConnection.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Connection accepted!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
    },
    onSettled: async () => {
      await Promise.all([
        utils.connection.getConnections.invalidate(),
        utils.doctor.getDoctors.invalidate(),
        utils.connection.getPrescriptionConnections.invalidate(),
      ]);
      setLoading(false);
    },
    onError: (err) => {
      const code = err instanceof TRPCClientError ? err.data?.code : undefined;

      if (code === "NOT_FOUND") {
        toast("Connection was already canceled.", {
          action: { label: "Close", onClick: () => {} },
        });
        return;
      } else {
        toast("Couldn't accept connection request!", {
          action: {
            label: "Close",
            onClick: () => {
              return;
            },
          },
        });
      }
    },
  });

  const declineMutation = api.connection.declineConnection.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast(
        user.doctor == true ? "Connection declined!" : "Connection canceled!",
        {
          action: {
            label: "Close",
            onClick: () => {
              return;
            },
          },
        },
      );
    },
    onSettled: async () => {
      await Promise.all([
        utils.connection.getConnections.invalidate(),
        utils.doctor.getDoctors.invalidate(),
      ]);
      setLoading(false);
    },
    onError: (err) => {
      const code = err instanceof TRPCClientError ? err.data?.code : undefined;

      if (code === "NOT_FOUND") {
        toast("Connection was already canceled.", {
          action: { label: "Close", onClick: () => {} },
        });
        return;
      } else {
        toast("Error declining connection! ", {
          action: {
            label: "Close",
            onClick: () => {
              return;
            },
          },
        });
      }
    },
  });

  const deleteMutation = api.connection.declineConnection.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Connection removed!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
    },
    onSettled: async () => {
      await Promise.all([
        utils.connection.getConnections.invalidate(),
        utils.doctor.getDoctors.invalidate(),
        utils.connection.getPrescriptionConnections.invalidate(),
      ]);
      setLoading(false);
    },
    onError: (err) => {
      const code = err instanceof TRPCClientError ? err.data?.code : undefined;

      if (code === "NOT_FOUND") {
        toast("Connection was already removed.", {
          action: { label: "Close", onClick: () => {} },
        });
        return;
      } else {
        toast("Couldn't remove connection!", {
          action: {
            label: "Close",
            onClick: () => {
              return;
            },
          },
        });
      }
    },
  });

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 self-center overflow-hidden rounded-full">
            <Image
              src={
                user.doctor === false
                  ? connection.doctor.doctorProfile?.image || "/default_pfp.jpg"
                  : connection.patient.patientProfile?.image ||
                    "/default_pfp.jpg"
              }
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <CardTitle>
              {user.doctor === false
                ? `${connection.doctor.doctorProfile?.firstName} ${connection.doctor.doctorProfile?.lastName}`
                : `${connection.patient.patientProfile?.firstName} ${connection.patient.patientProfile?.lastName}`}
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={loading}>
                  <Eye />
                  View details
                </Button>
              </DialogTrigger>
              <PatientDialog connection={connection} />
            </Dialog>
            <Button
              className="bg-[#2F80ED] text-white hover:bg-[#1366d6]"
              disabled={loading}
              onClick={() => {
                acceptMutation.mutate({ id: connection.id });
              }}
            >
              <Check />
              Accept
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
              disabled={loading}
              onClick={() => declineMutation.mutate({ id: connection.id })}
            >
              <X />
              Decline
            </Button>
          </div>
        ) : type === "request" && user.doctor === false ? (
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => {
                declineMutation.mutate({
                  id: connection.id,
                });
              }}
            >
              <UserMinus2 />
              Cancel connection request
            </Button>
            <Button variant="outline" disabled={loading}>
              <Eye />
              View details
            </Button>
          </div>
        ) : type === "connection" ? (
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => {
                deleteMutation.mutate({ id: connection.id });
              }}
            >
              <UserMinus2 />
              Remove connection
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={loading}>
                  <Eye />
                  View details
                </Button>
              </DialogTrigger>
              {user.doctor ? (
                <PatientDialog connection={connection} />
              ) : (
                <DoctorDialog connection={connection} />
              )}
            </Dialog>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="flex w-3/4 justify-between text-sm">
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
              <span>Doctor phone number: </span>
              {connection.patient.patientProfile?.familyDoctorPhone}
            </>
          ) : (
            <>
              <span>Cabinet city: </span>
              {connection.doctor.doctorProfile?.cabinetCity}
            </>
          )}
        </span>
           <span>
          {user.doctor ? (
            <>
              <span>Family doctor name: </span>
              {connection.patient.patientProfile?.familyDoctor}
            </>
          ) : (
            <>
              <span>Cabinet county: </span>
              {connection.doctor.doctorProfile?.cabinetCounty}
            </>
          )}
          </span>
      </CardContent>
    </Card>
  );
}
