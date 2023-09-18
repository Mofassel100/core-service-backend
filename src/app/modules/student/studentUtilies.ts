const groupByAcademicSemester = (data: any) => {
  const groupBy = data.reduce((result: any, course: any) => {
    const academcSemester = course.academcSemester;
    const academicSemeseterIds = academcSemester?.id;
    const existingGroup = result.find(
      (group: any) => group.academcSemester?.id === academicSemeseterIds
    );
    if (existingGroup) {
      existingGroup.completedCourses.push({
        id: course.id,
        createdAt: course.createdAt,
        courseId: course.courseId,
        grade: course.grade,
        point: course.point,
        totalMarks: course.totalMarks,
        course: course.course,
        academicSemester: course.academicSemester,
      });
    } else {
      result.push({
        academcSemester,
        completedCourses: [
          {
            id: course.id,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            studentId: course.studentId,
            courseId: course.courseId,
            grade: course.grade,
            point: course.point,
            totalMarks: course.totalMarks,
            course: course.course,
            academicSemester: course.academicSemester,
          },
        ],
      });
    }
    return result;
  }, []);
  return groupBy;
};
export const studentUtilies = {
  groupByAcademicSemester,
};
