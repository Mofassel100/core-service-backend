import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utilities';
import { ICreateOfferedCourse } from './offeredCourse.interface';

const insertIntoDB = async (
  data: ICreateOfferedCourse
): Promise<OfferedCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;
  // console.log(courseIds);
  const result: any[] = [];
  await asyncForEach(courseIds, async (courseID: string) => {
    const isExistData = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseID,
      },
    });

    if (!isExistData) {
      const newOfferedCourse = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseID,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      result.push(newOfferedCourse);
    }
  });
  return result;
};
export const OfferedCourseService = {
  insertIntoDB,
};
