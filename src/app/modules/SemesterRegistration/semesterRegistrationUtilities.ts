const getAvailableCourse = (
  offeredCourses: any,
  studentCompletCoreses: any,
  studentCurrentSemesterTakenCourse: any
) => {
  const completedCourseId = studentCompletCoreses.map(
    (course: any) => course.courseID
  );
  const availableCourse = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCourseId.includes(offeredCourse.courseID)
    )
    .filter((course: any) => {
      const preRequisites = course.course.preRequisite;
      if (preRequisites.length === 0) {
        return true;
      } else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.preRequisiteID
        );
        return preRequisiteIds.every((id: string) =>
          completedCourseId.includes(id)
        );
      }
    })
    .map((course: any) => {
      const isAlreadyTakenCourse = studentCurrentSemesterTakenCourse.find(
        (c: any) => c.offeredCourseSectionId === course.id
      );
      console.log(isAlreadyTakenCourse);
      if (isAlreadyTakenCourse) {
        course.offeredCourseSections.map((section: any) => {
          if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
            section.isTaken = true;
          } else {
            section.isTaken = false;
          }
        });
        return {
          ...course,
          isTaken: true,
        };
      } else {
        course.offeredCourseSections.map((section: any) => {
          section.isTaken = false;
        });
        return {
          ...course,
          isTaken: false,
        };
      }
    });
  // console.log(availableCourse);
  return availableCourse;
};
export const semesterRegistrationUtilis = {
  getAvailableCourse,
};
