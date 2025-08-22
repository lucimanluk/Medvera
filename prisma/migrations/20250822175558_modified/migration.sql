/*
  Warnings:

  - You are about to drop the column `appintmentPrice` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appintmentPrice",
ADD COLUMN     "appointmentPrice" INTEGER;
