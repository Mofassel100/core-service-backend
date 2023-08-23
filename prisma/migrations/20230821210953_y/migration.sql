/*
  Warnings:

  - You are about to drop the `academic_semesters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicSemesterId_fkey";

-- DropTable
DROP TABLE "academic_semesters";

-- CreateTable
CREATE TABLE "academic_semester" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "startMonth" TEXT NOT NULL,
    "endMonth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_semester_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
