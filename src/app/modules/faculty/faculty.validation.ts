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
const UpdateFaculty = z.object({
  body: z.object({
    facultyId: z
      .string({
        required_error: 'facultyId is Required',
      })
      .optional(),
    firstName: z
      .string({
        required_error: 'firstName is required',
      })
      .optional(),
    lastName: z
      .string({
        required_error: 'lastName is Required',
      })
      .optional(),
    middeName: z
      .string({
        required_error: 'middeName is required',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'profileName is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'email is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'contactNo is Required',
      })
      .optional(),
    gender: z
      .string({
        required_error: 'gender is Required',
      })
      .optional(),
    bloodgroup: z
      .string({
        required_error: 'bloodgroup is required',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'designation is Required',
      })
      .optional(),
    academicFacultyId: z
      .string({
        required_error: 'academicFacultyId is required',
      })
      .optional(),
    academicDepartmentId: z
      .string({
        required_error: 'academicDepartmentId is required',
      })
      .optional(),
  }),
});
const assignOrRemoceCourese = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'courses is required',
    }),
  }),
});
export const FacultyValidation = {
  facultyCreate,
  UpdateFaculty,
  assignOrRemoceCourese,
};
