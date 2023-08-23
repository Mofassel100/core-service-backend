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

export const AcademicDepartmentValidation = {
  AcademicDepartmentValid,
};
