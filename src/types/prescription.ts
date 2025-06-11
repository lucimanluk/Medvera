import type { User } from "./user";

export interface Prescription {
    id: string;
    createdAt: Date;
    startingDate: Date;
    endingDate: Date;
    title: string;
    pill: string;
    description: string;
    patient: User;
    doctor: User;
}