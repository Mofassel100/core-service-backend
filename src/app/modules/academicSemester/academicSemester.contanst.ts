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
