import { z } from 'zod';

const studentcreate = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'StudentId is Requered',
    }),

    firstName: z.string({
      required_error: 'firstNmae is required',
    }),
    lastName: z.string({
      required_error: 'lastName is required',
    }),
    middeName: z
      .string({
        required_error: 'middeName is required',
      })
      .optional(),
    profileImage: z.string({
      required_error: 'profileImage is requeired',
    }),
    email: z.string({
      required_error: 'email is Required',
    }),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    gender: z.string({
      required_error: 'gender is required',
    }),
    bloodgroup: z.string({
      required_error: ' bloodgroup is Required',
    }),
    academicSemesterId: z.string({
      required_error: 'academciSemesterId is required',
    }),
    academicFacultyId: z.string({
      required_error: 'AcadeciFaculty is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId  is required',
    }),
  }),
});
export const StudentValidations = {
  studentcreate,
};
