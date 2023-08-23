/*
  Warnings:

  - You are about to drop the column `createAt` on the `academic_department` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `academic_faculty` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `academic_semester` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `faculty` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "academic_department" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "academic_faculty" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "academic_semester" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "faculty" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
