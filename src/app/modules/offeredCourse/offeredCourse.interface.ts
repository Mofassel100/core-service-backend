export type ICreateOfferedCourse = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: string[];
};
export type IOfferCourseFilterRequiest = {
  searchTerm?: string | undefined;
  academicDepartmentId?: string | undefined;
  semesterRegistrationId?: string | undefined;
  courseID?: string | undefined;
};
