import type { User } from "./user";

export interface DoctorConnection {
    id: string;
    createdAt: Date;
    patientId: string;
    doctorId: string;
    accepted: boolean;
    doctor: User;
    patient: User;
}