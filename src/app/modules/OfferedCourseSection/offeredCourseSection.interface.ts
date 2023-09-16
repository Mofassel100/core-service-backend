export type IOfferedCourseSectionFilterRequest = {
  searchTerm?: string | undefined;
  offeredCourseId?: string | undefined;
};
export type IOCSection = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
};
export type IClassSchedules = {
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  facultyId: string;
  roomId: string;
};
export type IOfferedCourseSection = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
  classSchedules: IClassSchedules[];
};
