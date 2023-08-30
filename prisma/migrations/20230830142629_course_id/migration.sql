/*
  Warnings:

  - You are about to drop the column `courseId` on the `offered_course` table. All the data in the column will be lost.
  - Added the required column `courseID` to the `offered_course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offered_course" DROP CONSTRAINT "offered_course_courseId_fkey";

-- AlterTable
ALTER TABLE "offered_course" DROP COLUMN "courseId",
ADD COLUMN     "courseID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
