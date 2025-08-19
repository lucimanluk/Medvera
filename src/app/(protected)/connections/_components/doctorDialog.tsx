import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import type { DoctorConnection } from "~/types/connection";

export default function DoctorDialog({
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
        <img
          src={connection.doctor.image || "/default_pfp.jpg"}
          className="h-20 w-20 self-center rounded-full"
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">First name</Label>
            <span>
              {connection.doctor.doctorProfile?.firstName?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Last name</Label>
            <span>
              {connection.doctor.doctorProfile?.lastName?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Email</Label>
            <span>
              {connection.doctor.doctorProfile?.userEmail?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Cabinet phone number</Label>
            <span>
              {connection.doctor.doctorProfile?.cabinetPhone?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Birth date</Label>
            <span>
              {connection.doctor.doctorProfile?.birthDate &&
              !Number.isNaN(
                new Date(
                  connection.doctor.doctorProfile.birthDate as any,
                ).getTime(),
              )
                ? new Date(connection.doctor.doctorProfile.birthDate as any)
                    .toISOString()
                    .slice(0, 10)
                : "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Gender</Label>
            <span>
              {connection.doctor.doctorProfile?.gender?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Specialization</Label>
            <span>
              {connection.doctor.doctorProfile?.specialization?.trim?.() ||
                "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Date of issue</Label>
            <span>
              {connection.doctor.doctorProfile?.specializationIssueDate &&
              !Number.isNaN(
                new Date(
                  connection.doctor.doctorProfile
                    .specializationIssueDate as any,
                ).getTime(),
              )
                ? new Date(
                    connection.doctor.doctorProfile
                      .specializationIssueDate as any,
                  )
                    .toISOString()
                    .slice(0, 10)
                : "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Cabinet name</Label>
            <span>
              {connection.doctor.doctorProfile?.cabinetName?.trim?.() || "---"}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto thin-scrollbar overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Cabinet county</Label>
            <span>
              {connection.doctor.doctorProfile?.cabinetCounty?.trim?.() || "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Cabinet address</Label>
            <span>
              {connection.doctor.doctorProfile?.cabinetAddress?.trim?.() ||
                "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Cabinet city</Label>
            <span>
              {connection.doctor.doctorProfile?.cabinetCity?.trim?.() || "---"}
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Appointment price (prices in RON)</Label>
            <span>{connection.doctor.doctorProfile?.appointmentPrice ?? "---"}</span>
          </div>
          <div className="flex flex-col overflow-y-auto thin-scrollbar">
            <Label className="font-bold">Apointment duration (in minutes)</Label>
            <span>{connection.doctor.doctorProfile?.appointmentDuration ?? "---"}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
