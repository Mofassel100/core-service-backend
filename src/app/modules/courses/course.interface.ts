export type ICoursesCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: IPreRequisiteCourseRequist[];
};
export type IPreRequisiteCourseRequist = {
  courseID: string;
  isDeleted?: null;
};
export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
