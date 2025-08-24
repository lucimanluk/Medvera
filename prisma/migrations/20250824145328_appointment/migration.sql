/*
  Warnings:

  - Made the column `appointmentDuration` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "appointmentDuration" SET NOT NULL;
