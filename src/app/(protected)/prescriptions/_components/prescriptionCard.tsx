"use client";

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
import { Eye, Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrescriptionPDF } from "./prescriptionPDF";
import { useMemo } from "react";
import Image from "next/image";

export default function PrescriptionCard({
  props,
  user,
  type,
}: {
  props: PrescriptionType;
  user: User;
  type: string;
}) {
  const memoizedDoc = useMemo(() => <PrescriptionPDF data={props} />, [props]);
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 self-center overflow-hidden rounded-full">
            <Image
              src={
                user.doctor === false
                  ? props.doctor.doctorProfile?.image || "/default_pfp.jpg"
                  : props.patient.patientProfile?.image || "/default_pfp.jpg"
              }
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle>
              {props.dosage} {props.medicationName}
            </CardTitle>
            <CardDescription>
              {user.doctor ? (
                <span>
                  Assigned to {props.patient.patientProfile?.firstName}{" "}
                  {props.patient.patientProfile?.lastName}
                </span>
              ) : (
                <span>
                  Assigned by {props.doctor.doctorProfile?.firstName}{" "}
                  {props.doctor.doctorProfile?.lastName}
                </span>
              )}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {type != "past" || user.doctor == true ? (
            <PDFDownloadLink
              document={memoizedDoc}
              fileName={`prescription-${props.id}.pdf`}
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs hover:bg-gray-100"
            >
              {({ loading, error }) => (
                <>
                  <Download className="h-4 w-4" />
                  {loading
                    ? "Preparing PDF…"
                    : error
                      ? "Try again"
                      : "Download prescription"}
                </>
              )}
            </PDFDownloadLink>
          ) : null}
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
              <div className="flex flex-row items-center gap-2">
                <div className="relative h-10 w-10 self-center overflow-hidden rounded-full">
                  <Image
                    src={
                      user.doctor === false
                        ? props.doctor.doctorProfile?.image ||
                          "/default_pfp.jpg"
                        : props.patient.patientProfile?.image ||
                          "/default_pfp.jpg"
                    }
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col">
                  {user.doctor ? (
                    <span>
                      Assigned to {props.patient.patientProfile?.firstName}{" "}
                      {props.patient.patientProfile?.lastName}
                    </span>
                  ) : (
                    <span>
                      Assigned by {props.doctor.doctorProfile?.firstName}{" "}
                      {props.doctor.doctorProfile?.lastName}
                    </span>
                  )}
                  <span>{props.doctor.doctorProfile?.specialization}</span>
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
                  <span>{props.startingDate.toISOString().slice(0, 10)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Ending date</Label>
                  <span>{props.endingDate.toISOString().slice(0, 10)}</span>
                </div>
              </div>
              <div className="flex max-h-70 h-70 flex-col gap-2">
                <div className="flex max-h-1/2 flex-col overflow-auto">
                  <Label>Diagnostics</Label>
                  <ScrollArea className="break-all whitespace-pre-wrap">
                    {props.diagnostic}
                  </ScrollArea>
                </div>
                <div className="flex max-h-1/2 flex-col overflow-auto">
                  <Label>Instructions</Label>
                  <ScrollArea className="break-all whitespace-pre-wrap">
                  {props.instructions}
                  </ScrollArea>
                </div>
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
                  <Button variant="outline">Close</Button>
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
          Starting date: {props.startingDate.toISOString().slice(0, 10)}{" "}
        </span>
        <span>Ending date: {props.endingDate.toISOString().slice(0, 10)}</span>
      </CardContent>
    </Card>
  );
}
