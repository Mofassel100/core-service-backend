import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academciSemester.interface';

export const AcademicFilterSerceProperty = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];
export const filterControllerSerTers = [
  'serchTerm',
  'code',
  'title',
  'startMonth',
  'endMonth',
];
export const controllerPaginations = ['page', 'limit', 'sortBy', 'sortOrder'];
export const AcademicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester.UPDATED';
export const EVENT_ACADEMIC_SEMESTER_GET_ALL = 'academic-semester.get-all';
export const EVENT_ACADEMIC_SEMESTER_GET_SINGLE =
  'academic-semester.get-single';
export const EVENT_ACADEMIC_SEMESTER_GET_DELETED = 'academic-semester.deleted';
export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesteTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academictSemesterCode: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];
