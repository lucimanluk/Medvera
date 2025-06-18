/*
  Warnings:

  - You are about to drop the column `description` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `pill` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `dosage` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicationName` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "description",
DROP COLUMN "pill",
DROP COLUMN "title",
ADD COLUMN     "dosage" TEXT NOT NULL,
ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "medicationName" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL;
