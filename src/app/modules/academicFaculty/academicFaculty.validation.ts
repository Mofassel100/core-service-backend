import { z } from 'zod';

const AcademicFacultyValidations = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is requered validation',
    }),
  }),
});
export const AcademicFacultyValidation = {
  AcademicFacultyValidations,
};
