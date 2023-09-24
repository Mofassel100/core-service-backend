export const facultyFilterableFields: string[] = [
  'searchTerm' ||
    'firstName' ||
    'lastName' ||
    'middName' ||
    'facultyId' ||
    'email' ||
    'contactNo' ||
    'gender' ||
    'bloodGroup' ||
    'designation' ||
    'id' ||
    'academicFacultyId' ||
    'academicDepartmentId',
];

export const facultySearchableFields: string[] = [
  'firstName' ||
    'lastName' ||
    'middName' ||
    'email' ||
    'contactNo' ||
    'facultyId' ||
    'designation',
];

export const facultyRelationalFields: string[] = [
  'academicFacultyId',
  'academicDepartmentId',
];
export const facultyRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',
};
export const EVENT_FACULTY_CREATED = 'faculty.created';
export const EVENT_CREATED_FACULTY = 'created.faculty';
export const EVENT_UPDATED_FACULTY = 'update.faculty';
export const EVENT_GET_ALL_FACULTY = 'faculty-get.facultys';
export const EVENT_GET_SINGLE_FACULTY = 'faculty-get.signlefaculty';
export const EVENT_DELETE_FACULTY = 'faculty.deleted';
