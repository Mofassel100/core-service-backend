import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICoursesCreateData } from './course.interface';

const insertIntoDB = async (data: ICoursesCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;
  console.log(preRequisiteCourses, courseData);
  const newCourse = await prisma.$transaction(async trasactionClient => {
    const result = await trasactionClient.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unbble courses data');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPrerequisite =
          await trasactionClient.courseToPrerequisite.create({
            data: {
              courseID: result.id,
              preRequisiteID: preRequisiteCourses[index].courseID,
            },
          });
        console.log(createPrerequisite);
      }
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'not courese created');
};
export const CourseService = {
  insertIntoDB,
};
