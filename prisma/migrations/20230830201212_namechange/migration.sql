/*
  Warnings:

  - You are about to drop the `OfferedCourseSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OfferedCourseSection" DROP CONSTRAINT "OfferedCourseSection_offeredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "OfferedCourseSection" DROP CONSTRAINT "OfferedCourseSection_semesterRegistrationId_fkey";

-- DropTable
DROP TABLE "OfferedCourseSection";

-- CreateTable
CREATE TABLE "offerd_course_section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEnrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offerd_course_section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offerd_course_section" ADD CONSTRAINT "offerd_course_section_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerd_course_section" ADD CONSTRAINT "offerd_course_section_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
