export const offeredCourseClassScheduleSearchableFields = ['dayOfWeek'];
// export const offeredCourseClassScheduleSearchableFields = ['dayOfWeek']

export const offeredCourseClassScheduleRelationalFields = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'facultyId',
  'roomId',
];
// export const offeredCourseClassScheduleRelationalFields = [
//   'offeredCourseSectionId',
//   'facultyId',
//   'roomId',
//   'facultyId',
// ];
// export const offeredCourseClassScheduleRelationalFieldsMapper: {
//   [key: string]: string;
// } = {
//   offeredCourseSectionId: 'offeredCourseSection',
//   facultyId: 'faculty',
//   roomId: 'room',
//   semesterRegistrationId: 'semesterRegistration',
// };
export const offeredCourseClassScheduleRelationalFieldsMapper: {
  [key: string]: string;
} = {
  offeredCourseSectionId: 'offeredCourseSection',
  semesterRegistrationId: 'semesterRegistration',
  facultyId: 'faculty',
  roomId: 'room',
};

export const offeredCourseClassScheduleFilterableFields = [
  'searchTerm',
  'dayOfWeek',
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];
