/*
  Warnings:

  - Added the required column `patientName` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "patientName" TEXT NOT NULL;
