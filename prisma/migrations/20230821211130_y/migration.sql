/*
  Warnings:

  - You are about to drop the column `createdAt` on the `academic_faculty` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `academic_semester` table. All the data in the column will be lost.
  - You are about to drop the `academic_departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faculties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "academic_departments" DROP CONSTRAINT "academic_departments_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicSemesterId_fkey";

-- AlterTable
ALTER TABLE "academic_faculty" DROP COLUMN "createdAt",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "academic_semester" DROP COLUMN "createdAt",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "academic_departments";

-- DropTable
DROP TABLE "faculties";

-- DropTable
DROP TABLE "students";

-- CreateTable
CREATE TABLE "academic_department" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicFacultyId" TEXT NOT NULL,

    CONSTRAINT "academic_department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middeName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "bloodgroup" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "academicFacultyId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculty" (
    "id" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middeName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "bloodgroup" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicFacultyId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academic_department" ADD CONSTRAINT "academic_department_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
