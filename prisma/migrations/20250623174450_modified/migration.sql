/*
  Warnings:

  - You are about to drop the column `userId` on the `DoctorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PatientProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `DoctorProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `PatientProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `DoctorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `PatientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DoctorProfile" DROP CONSTRAINT "DoctorProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientProfile" DROP CONSTRAINT "PatientProfile_userId_fkey";

-- DropIndex
DROP INDEX "DoctorProfile_userId_key";

-- DropIndex
DROP INDEX "PatientProfile_userId_key";

-- AlterTable
ALTER TABLE "DoctorProfile" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PatientProfile" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_userEmail_key" ON "DoctorProfile"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userEmail_key" ON "PatientProfile"("userEmail");

-- AddForeignKey
ALTER TABLE "PatientProfile" ADD CONSTRAINT "PatientProfile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorProfile" ADD CONSTRAINT "DoctorProfile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
