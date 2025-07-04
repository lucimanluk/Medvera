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
  instructions: string;
  patient: User;
  doctor: User;
}