import { z } from 'zod';

const createSemester = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is requerd validation',
    }),
    title: z.string({
      required_error: 'title is requered validation',
    }),
    code: z.string({
      required_error: 'code is requered validation',
    }),
    startMonth: z.string({
      required_error: 'startMonth is requered validation',
    }),
    endMonth: z.string({
      required_error: 'endMonth is requered validation',
    }),
  }),
});
const UpdataAcdemicSemester = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    code: z
      .string({
        required_error: 'code is required',
      })
      .optional(),
    startMonth: z
      .string({
        required_error: 'startMonth is required',
      })
      .optional(),
    endMonth: z
      .string({
        required_error: 'endMonth is required',
      })
      .optional(),
  }),
});
export const AcademicSemesterValidation = {
  createSemester,
  UpdataAcdemicSemester,
};
