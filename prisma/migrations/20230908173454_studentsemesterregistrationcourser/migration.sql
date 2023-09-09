-- CreateTable
CREATE TABLE "student_semester_registration_course" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_registration_course_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offeredCourseId")
);

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_semesterRegistrationI_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_offeredCourseSectionI_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offerd_course_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
