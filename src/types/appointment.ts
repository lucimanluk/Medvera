import type { User } from "./user";


export interface Appointment {
  id: string;
  createdAt: Date;
  appointmentDate: Date;
  appointmentPrice: number | null;
  appointmentDuration: number | null;
  doctor: User;
  patient: User;
}
