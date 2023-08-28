/*
  Warnings:

  - You are about to drop the `SemesterRegistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SemesterRegistration" DROP CONSTRAINT "SemesterRegistration_academicSemesterId_fkey";

-- DropTable
DROP TABLE "SemesterRegistration";

-- CreateTable
CREATE TABLE "semester_registration" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SemesterRegistrationStatus" NOT NULL DEFAULT 'UPCOMING',
    "minCredit" INTEGER NOT NULL DEFAULT 0,
    "maxCredit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicSemesterId" TEXT NOT NULL,

    CONSTRAINT "semester_registration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "semester_registration" ADD CONSTRAINT "semester_registration_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
