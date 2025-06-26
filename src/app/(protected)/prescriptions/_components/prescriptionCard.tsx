import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Prescription as PrescriptionType } from "~/types/prescription";
import type { User } from "~/types/user";
import { Eye, Trash, Edit } from "lucide-react";

export default function PrescriptionCard({
  props,
  user,
  type,
}: {
  props: PrescriptionType;
  user: User;
  type: string;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-black" />
          <div className="flex flex-col gap-1">
            <CardTitle>
              {props.dosage} {props.medicationName}
            </CardTitle>
            <CardDescription>
              {user.doctor ? (
                <span>Assigned to {props.patient.name}</span>
              ) : (
                <span>Assigned by {props.doctor.name}</span>
              )}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#2F80ED] text-white hover:bg-[#1366d6]">
                <Eye />
                View details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Prescription</DialogTitle>
                <DialogDescription>
                  See prescription details here
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-row items-center">
                {/*<div className="h-10 w-10 rounded-full bg-black" />*/}
                <div className="flex flex-col">
                  {user.doctor ? (
                    <span>Assigned to {props.patient.name}</span>
                  ) : (
                    <span>Assigned by {props.doctor.name}</span>
                  )}
                  <span>Varsta si gen sau ce fel de doctor e </span>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <Label>Medication</Label>
                  <span>{props.medicationName}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Dosage</Label>
                  <span>{props.dosage}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Frequency</Label>
                  <span>{props.frequency}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Quantity</Label>
                  <span>{props.quantity}</span>
                </div>
              </div>
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <Label>Starting date</Label>
                  <span>{props.startingDate.toDateString()}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Ending date</Label>
                  <span>{props.endingDate.toDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Instructions</Label>
                <ScrollArea className="h-70">{props.instructions}</ScrollArea>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span>Date:</span>
                  <span>{props.createdAt.toDateString()}</span>
                </div>
                <div className="flex flex-col">
                  <span>Doctor's signature:</span>
                  <img
                    src="https://www.pngkey.com/png/detail/231-2318549_doctor-transparent-signature-signature-of-a-doctor.png"
                    alt="Doctor signature"
                    width="200"
                    height="200"
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <span>Medication: {props.medicationName}</span>
        <span>Dosage: {props.dosage}</span>
        <span>Frequency: {props.frequency}</span>
        <span>Quantity: {props.quantity}</span>
        <span>
          From: {props.startingDate.toDateString()} <span>to </span>
          {props.endingDate.toDateString()}
        </span>
      </CardContent>
    </Card>
  );
}
