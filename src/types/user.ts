import type { DoctorProfile } from "@prisma/client";
import type { PatientProfile } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  doctor?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  patientProfile?: PatientProfile | null;
  doctorProfile?: DoctorProfile | null;
}