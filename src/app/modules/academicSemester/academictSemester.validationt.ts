import { z } from 'zod';
import {
  academicSemesteTitle,
  academicSemesterMonth,
  academictSemesterCode,
} from './academicSemester.contanst';
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesteTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academictSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'startMonth is Required',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});
const UpdateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesteTitle] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .number({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...academictSemesterCode] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'startMonth is Required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be rpovide or neithre',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  UpdateAcademicSemesterZodSchema,
};
