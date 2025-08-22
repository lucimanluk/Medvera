import type { User } from "./user";

export interface Prescription {
  id: string;
  createdAt: Date;
  startingDate: Date;
  endingDate: Date;
  medicationName: string;
  dosage: string;
  frequency: string;
  quantity: string;
  diagnostic: string;
  instructions: string;
  patientName: string;
  doctorName: string;
  cabinetName: string;
  cabinetPhone: string;
  cabinetAddress: string;
  patient: User;
  doctor: User;
}
