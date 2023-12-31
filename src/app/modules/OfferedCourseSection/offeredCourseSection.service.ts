import { OfferedCourseSection, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utilities';
import { OfferedCourseClassScheduleUtils } from '../offeredCourseClassSchedule/offeredCourseClassSchedule.utilities';
import {
  offeredCourseSectionRelationalFields,
  offeredCourseSectionRelationalFieldsMapper,
  offeredCourseSectionSearchableFields,
} from './offeredCourseSection.constant';
import {
  IOfferedCourseSection,
  IOfferedCourseSectionFilterRequest,
} from './offeredCourseSection.interface';

const insertIntoDB = async (
  payload: IOfferedCourseSection
): Promise<OfferedCourseSection | null> => {
  const { classSchedules, ...data } = payload;
  console.log(classSchedules, data);
  const isExistOffCouData = await prisma.offeredCourse.findFirst({
    where: { id: data.offeredCourseId },
  });
  if (!isExistOffCouData) {
    throw new ApiError(httpStatus.OK, 'offeredCourseID does not exist');
  }

  await asyncForEach(classSchedules, async (schedule: any) => {
    await OfferedCourseClassScheduleUtils.checkFacultyAvailable(schedule);
    await OfferedCourseClassScheduleUtils.checkRoomAvailable(schedule);
  });
  const offeredCourseSectionData = await prisma.offeredCourseSection.findFirst({
    where: {
      offerdCourse: {
        id: data.offeredCourseId,
      },
      title: data.title,
    },
  });
  if (offeredCourseSectionData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'offeredCourse is already sexist'
    );
  }
  const createSection = await prisma.$transaction(async transactioClient => {
    const createOfferedCourseSection =
      await transactioClient.offeredCourseSection.create({
        data: {
          title: data.title,
          maxCapacity: data.maxCapacity,
          offeredCourseId: data.offeredCourseId,
          semesterRegistrationId: isExistOffCouData.semesterRegistrationId,
        },
      });
    const shecdulesData = classSchedules.map((schedule: any) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      semesterRegistrationId: isExistOffCouData.semesterRegistrationId,
      offeredCourseSectionId: createOfferedCourseSection.id,
    }));

    await transactioClient.offeredCourseClassSchedule.createMany({
      data: shecdulesData,
    });
    return createOfferedCourseSection;
  });
  const result = await prisma.offeredCourseSection.findFirst({
    where: {
      id: createSection.id,
    },
    include: {
      offerdCourse: {
        include: {
          course: true,
        },
      },
      offeredCourseClassSchedules: {
        include: {
          room: {
            include: {
              bulding: true,
            },
          },
          faculty: true,
        },
      },
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseSectionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseSection[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSectionSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseSectionRelationalFields.includes(key)) {
          return {
            [offeredCourseSectionRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCourseSectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseSection.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      offerdCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  const total = await prisma.offeredCourseSection.count({
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

const getByIdFromDB = async (
  id: string
): Promise<OfferedCourseSection | null> => {
  const result = await prisma.offeredCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offerdCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<OfferedCourseSection>
): Promise<OfferedCourseSection> => {
  //update
  const result = await prisma.offeredCourseSection.update({
    where: {
      id,
    },
    data: payload,
    include: {
      offerdCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.delete({
    where: {
      id,
    },
    include: {
      offerdCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};
export const OfferedCourseSectionService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
