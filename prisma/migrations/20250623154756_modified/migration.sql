/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "appointmentDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "PatientProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "series" TEXT,
    "cnp" TEXT,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT,
    "address" TEXT,
    "city" TEXT,
    "county" TEXT,
    "zipCode" TEXT,
    "emergencyFirst" TEXT,
    "emergencyLast" TEXT,
    "emergencyRelation" TEXT,
    "emergencyPhone" TEXT,
    "familyDoctor" TEXT,
    "familyDoctorPhone" TEXT,
    "bloodType" TEXT,
    "rhFactor" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "medicalConditions" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "PatientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "series" TEXT,
    "cnp" TEXT,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT,
    "specialization" TEXT,
    "specializationIssueDate" TIMESTAMP(3),
    "cabinetName" TEXT,
    "cabinetPhone" TEXT,
    "cabinetAddress" TEXT,
    "cabinetCity" TEXT,
    "cabinetCounty" TEXT,
    "cabinetZipCode" TEXT,
    "cmrSeries" TEXT,
    "cmrNumber" TEXT,
    "cmrIssueDate" TIMESTAMP(3),
    "cmrExpirationDate" TIMESTAMP(3),
    "digiSigSeries" TEXT,
    "digiSigNumber" TEXT,
    "digiSigIssueDate" TIMESTAMP(3),
    "digiSigExpirationDate" TIMESTAMP(3),

    CONSTRAINT "DoctorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userId_key" ON "PatientProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_userId_key" ON "DoctorProfile"("userId");

-- AddForeignKey
ALTER TABLE "PatientProfile" ADD CONSTRAINT "PatientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorProfile" ADD CONSTRAINT "DoctorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
