import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ISemesterRegistrationFilterRequest } from './semesterRegistration.interface';
import { semesterRegistrationSearchableFields } from './semesterRegitration.constants';

const insertIntoDb = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isAnSemesterRegistrationUPCOMINGorONGONIN =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });
  if (isAnSemesterRegistrationUPCOMINGorONGONIN) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There Alredy register SemesterRegistration ${isAnSemesterRegistrationUPCOMINGorONGONIN.status}`
    );
  }
  const result = await prisma.semesterRegistration.create({
    data,
  });
  return result;
};
const getAllFromDB = async (
  filters: ISemesterRegistrationFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: semesterRegistrationSearchableFields.map(filedPropery => ({
        [filedPropery]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map(faild => ({
        [faild]: {
          equals: (filtersData as any)[faild],
        },
      })),
    });
  }
  const whereConditint: Prisma.SemesterRegistrationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.semesterRegistration.findMany({
    where: whereConditint,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// // get single data
// const getSingById = async (id: string): Promise<AcademicSemester | null> => {
//   const result = await prisma.academicSemester.findUnique({
//     where: {
//       id,
//     },
//   });
//   return result;
// };
// update academicSemester
const UpdateSemesterRegistration = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data not Found');
  }
  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.UPCOMING &&
    payload.status !== SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from UPCOMING to ONGOING'
    );
  }
  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.ONGOING &&
    payload.status !== SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from ONGOING to ENDED'
    );
  }
  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicsemester: true,
    },
  });
  return result;
};
// // Deleted single data
// const DeletedSingById = async (
//   id: string
// ): Promise<AcademicSemester | null> => {
//   const result = await prisma.academicSemester.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };
export const SemesterRegistrationService = {
  insertIntoDb,
  UpdateSemesterRegistration,
  getAllFromDB,
};
