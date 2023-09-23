export const studentFilterableFields: string[] = [
  'searchTerm' ||
    'studentId' ||
    'id' ||
    'email' ||
    'contactNo' ||
    'gender' ||
    'firstName' ||
    'lastName' ||
    'middeName' ||
    'bloodgroup' ||
    'academicFacultyId' ||
    'academicDepartmentId' ||
    'academicSemesterId',
];
export const studentSearchableFields: string[] = [
  'firstName' ||
    'lastName' ||
    'middeName' ||
    'email' ||
    'gender' ||
    'bloodgroup' ||
    'contactNo' ||
    'studentId',
];

export const studentRelationalFields: string[] = [
  'academicFacultyId',
  'academicDepartmentId',
  'academicSemesterId',
];
export const studentRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',

  academicSemesterId: 'academicSemester',
};
export const STUDENT_CREATED_EVENT = 'student.create';
