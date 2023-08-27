import { Course, Prisma, courseFaculty } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utilities';
import { courseSearchableFields } from './course.constant';
import {
  ICourseFilterRequest,
  ICoursesCreateData,
  IPreRequisiteCourseRequist,
} from './course.interface';

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
      asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: IPreRequisiteCourseRequist) => {
          await trasactionClient.courseToPrerequisite.create({
            data: {
              courseID: result.id,
              preRequisiteID: preRequisiteCourse.courseID,
            },
          });
        }
      );
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

const getAllFromDB = async (
  filters: ICourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
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
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.course.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
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
  return result;
};

/// I intend to explore the update course functionalities in the upcoming module.
const UpdateDateDB = async (
  id: string,
  payload: ICoursesCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unbble Updated Coureses');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedRequisite = preRequisiteCourses.filter(
        coursePreRequisite =>
          coursePreRequisite.courseID && coursePreRequisite.isDeleted
      );
      const newRequisite = preRequisiteCourses.filter(
        coursePreRequisite =>
          coursePreRequisite.courseID && !coursePreRequisite.isDeleted
      );
      asyncForEach(
        deletedRequisite,
        async (deleteRequisites: IPreRequisiteCourseRequist) => {
          await transactionClient.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseID: id,
                },
                {
                  preRequisiteID: deleteRequisites.courseID,
                },
              ],
            },
          });
        }
      );
      asyncForEach(
        newRequisite,
        async (insertRequisites: IPreRequisiteCourseRequist) => {
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseID: id,
              preRequisiteID: insertRequisites.courseID,
            },
          });
        }
      );

      // console.log('d', deletedRequisite, 'new', newRequisite);
    }
    return result;
  });
  const responseData = await prisma.course.findUnique({
    where: {
      id,
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
};

const deleteByIdFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
    where: {
      OR: [
        {
          courseID: id,
        },
        {
          preRequisiteID: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};
// assignFacultyId
const assignFacultyId = async (
  id: string,
  payload: string[]
): Promise<courseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload?.map(facultyData => ({
      courseID: id,
      facultyId: facultyData,
    })),
  });
  const assingFind = await prisma.courseFaculty.findMany({
    where: {
      courseID: id,
    },
    include: {
      facuties: true,
    },
  });
  return assingFind;
};

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  UpdateDateDB,
  assignFacultyId,
};
