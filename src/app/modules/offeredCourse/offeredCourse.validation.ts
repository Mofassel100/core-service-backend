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
export const OfferedCourseValidation = {
  createOfferedCourse,
};
