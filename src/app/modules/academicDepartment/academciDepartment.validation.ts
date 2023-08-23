import { z } from 'zod';

const AcademicDepartmentValid = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Requered',
    }),
    academicFacultyId: z.string({
      required_error: ' academic Department Is Required',
    }),
  }),
});
const UpdateDepartment = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    academicFacultyId: z
      .string({
        required_error: ' academic Department Is Required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  AcademicDepartmentValid,
  UpdateDepartment,
};
