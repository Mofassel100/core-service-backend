export const academicDepartmentFilterableFields: string[] = [
  'searchTerm',
  'id',
  'academicFacultyId',
];

export const academicDepartmentSearchableFields: string[] = ['title'];

export const academicDepartmentRelationalFields: string[] = [
  'academicFacultyId',
];
export const academicDepartmentRelationalFieldsMapper: {
  [key: string]: string;
} = {
  academicFacultyId: 'academicFaculty',
};
export const EVENT_ACADEMIC_DEPARTMENT_CREATED = 'academic-department.created';
export const EVENT_ACADEMIC_DEPARTMENT_UPDATED = 'academic-department.updated';
export const EVENT_ACADEMIC_DEPARTMENT_GET_ALL = 'academic-department.get-all';
export const EVENT_ACADEMIC_DEPARTMENT_GET_SINGLE =
  'academic-department.get-single';
export const EVENT_ACADEMIC_DEPARTMENT_GET_DELETED =
  'academic-department.deleted';
