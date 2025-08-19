import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import type { DoctorConnection } from "~/types/connection";

export default function PatientDialog({
  connection,
}: {
  connection: DoctorConnection;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Connection details</DialogTitle>
        <DialogDescription>Details about this connection.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-8"> 
        <img src = {connection.patient.image || "/default_pfp.jpg"} className="h-20 w-20 rounded-full self-center"/>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">First name</Label>
            <span>
              {connection.patient.patientProfile?.firstName?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Last name</Label>
            <span>
              {connection.patient.patientProfile?.lastName?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Email</Label>
            <span>
              {connection.patient.patientProfile?.userEmail?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Phone number</Label>
            <span>
              {connection.patient.patientProfile?.phoneNumber?.trim?.() ||
                "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Birth date</Label>
            <span>
              {connection.patient.patientProfile?.birthDate &&
              !Number.isNaN(
                new Date(
                  connection.patient.patientProfile.birthDate as any,
                ).getTime(),
              )
                ? new Date(connection.patient.patientProfile.birthDate as any)
                    .toISOString()
                    .slice(0, 10)
                : "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Gender</Label>
            <span>
              {connection.patient.patientProfile?.gender?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Emergency first name</Label>
            <span>
              {connection.patient.patientProfile?.emergencyFirst?.trim?.() ||
                "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Emergency last name</Label>
            <span>
              {connection.patient.patientProfile?.emergencyLast?.trim?.() ||
                "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Emergency relation</Label>
            <span>
              {connection.patient.patientProfile?.emergencyRelation?.trim?.() ||
                "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Emergency phone</Label>
            <span>
              {connection.patient.patientProfile?.emergencyPhone?.trim?.() ||
                "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Family doctor</Label>
            <span>
              {connection.patient.patientProfile?.familyDoctor?.trim?.() ||
                "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Family docotor phone</Label>
            <span>
              {connection.patient.patientProfile?.familyDoctorPhone?.trim?.() ||
                "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Blood type</Label>
            <span>
              {connection.patient.patientProfile?.bloodType?.trim?.() || "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Rh factor</Label>
            <span>
              {connection.patient.patientProfile?.rhFactor?.trim?.() || "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Weight</Label>
            <span>{connection.patient.patientProfile?.weight ?? "---"}</span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Height</Label>
            <span>{connection.patient.patientProfile?.height ?? "---"}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
