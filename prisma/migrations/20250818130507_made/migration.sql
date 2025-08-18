/*
  Warnings:

  - Made the column `diagnostic` on table `Prescription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Prescription" ALTER COLUMN "diagnostic" SET NOT NULL;
