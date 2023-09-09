export type IOfferedCourseSectionFilterRequest = {
  searchTerm?: string | undefined;
  offeredCourseId?: string | undefined;
};
export type IOCSection = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
};
