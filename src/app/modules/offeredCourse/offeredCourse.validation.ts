import { z } from 'zod';

const createOfferedCourse = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId id is Required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId id  is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'courseIds id is required',
      }),
      { required_error: 'courseIds id is required' }
    ),
  }),
});

const update = z.object({
  body: z.object({
    semesterRegistrationId: z.string().optional(),
    courseId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourse,
  update,
};
