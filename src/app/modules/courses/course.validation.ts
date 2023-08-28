import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    code: z.string({
      required_error: 'Code is required',
    }),
    credits: z.number({
      required_error: 'Credits is required',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseID: z.string({}),
        })
      )
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          courseID: z.string({}),
          isDeleted: z.boolean({}).optional(),
        })
      )
      .optional(),
  }),
});
const assignOrRemoceFaculty = z.object({
  body: z.object({
    faculties: z.array(z.string(), {
      required_error: 'faculties is required',
    }),
  }),
});
export const CourseValidation = {
  create,
  update,
  assignOrRemoceFaculty,
};
