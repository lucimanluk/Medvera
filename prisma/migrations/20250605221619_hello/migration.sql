/*
  Warnings:

  - Made the column `createdAt` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `appointmentDate` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "appointmentDate" SET NOT NULL,
ALTER COLUMN "appointmentDate" SET DEFAULT CURRENT_TIMESTAMP;
