import type { User } from "./user";


export interface Appointment {
  id: string;
  createdAt: Date;
  appointmentDate: Date;
  doctor: User;
  patient: User;
}
