import { z } from 'zod';

const facultyCreate = z.object({
  body: z.object({
    facultyId: z.string({
      required_error: 'facultyId is Required',
    }),
    firstName: z.string({
      required_error: 'firstName is required',
    }),
    lastName: z.string({
      required_error: 'lastName is Required',
    }),
    middeName: z.string({
      required_error: 'middeName is required',
    }),
    profileImage: z.string({
      required_error: 'profileName is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    contactNo: z.string({
      required_error: 'contactNo is Required',
    }),
    gender: z.string({
      required_error: 'gender is Required',
    }),
    bloodgroup: z.string({
      required_error: 'bloodgroup is required',
    }),
    designation: z.string({
      required_error: 'designation is Required',
    }),
    academicFacultyId: z.string({
      required_error: 'academicFacultyId is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),
  }),
});
export const FacultyValidation = {
  facultyCreate,
};
