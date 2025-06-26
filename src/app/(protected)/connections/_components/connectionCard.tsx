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
import { toast } from "sonner";

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
      toast("Successfully accepted connection!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
      utils.connection.getConnections.invalidate();
    },
  });
  const declineMutation = api.connection.declineConnection.useMutation({
    onSuccess: () => {
      toast("Declined connection!", {
        action: {
          label: "Close",
          onClick: () => {
            return;
          },
        },
      });
      utils.connection.getConnections.invalidate();
    },
  });
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>{}</CardTitle>
            <CardDescription>Pipi</CardDescription>
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
      <CardContent className="flex w-3/4 justify-between"></CardContent>
    </Card>
  );
}
