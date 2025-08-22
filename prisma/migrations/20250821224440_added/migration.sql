/*
  Warnings:

  - Added the required column `cabinetAddress` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cabinetName` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cabinetPhone` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorName` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "cabinetAddress" TEXT NOT NULL,
ADD COLUMN     "cabinetName" TEXT NOT NULL,
ADD COLUMN     "cabinetPhone" TEXT NOT NULL,
ADD COLUMN     "doctorName" TEXT NOT NULL;
