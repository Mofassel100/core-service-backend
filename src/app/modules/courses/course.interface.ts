export type ICoursesCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseID: string;
  }[];
};
export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
