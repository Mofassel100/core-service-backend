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
const UpdateStudent = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: 'StudentId is Requered',
      })
      .optional(),

    firstName: z
      .string({
        required_error: 'firstNmae is required',
      })
      .optional(),
    lastName: z
      .string({
        required_error: 'lastName is required',
      })
      .optional(),
    middeName: z
      .string({
        required_error: 'middeName is required',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'profileImage is requeired',
      })
      .optional(),
    email: z
      .string({
        required_error: 'email is Required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'contactNo is required',
      })
      .optional(),
    gender: z
      .string({
        required_error: 'gender is required',
      })
      .optional(),
    bloodgroup: z
      .string({
        required_error: ' bloodgroup is Required',
      })
      .optional(),
    academicSemesterId: z
      .string({
        required_error: 'academciSemesterId is required',
      })
      .optional(),
    academicFacultyId: z
      .string({
        required_error: 'AcadeciFaculty is required',
      })
      .optional(),
    academicDepartmentId: z
      .string({
        required_error: 'academicDepartmentId  is required',
      })
      .optional(),
  }),
});
export const StudentValidations = {
  studentcreate,
  UpdateStudent,
};
