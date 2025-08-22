/*
  Warnings:

  - You are about to drop the column `allergies` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `medicalConditions` on the `PatientProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PatientProfile" DROP COLUMN "allergies",
DROP COLUMN "medicalConditions";
