import { AcademicSemester, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClinet } from '../../../shared/redis';
import { AFilterSerchTerm } from './academciSemester.interface';
import {
  AcademicFilterSerceProperty,
  AcademicSemesterTitleCodeMapper,
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_GET_ALL,
  EVENT_ACADEMIC_SEMESTER_GET_DELETED,
  EVENT_ACADEMIC_SEMESTER_GET_SINGLE,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.contanst';

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  if (AcademicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester Code');
  }
  const result = await prisma.academicSemester.create({
    data,
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_SEMESTER_CREATED,
      JSON.stringify(result)
    );
  }
  return result;
};
const getAcaSemDB = async (
  filters: AFilterSerchTerm,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { serchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (serchTerm) {
    andCondition.push({
      OR: AcademicFilterSerceProperty.map(filedPropery => ({
        [filedPropery]: {
          contains: serchTerm,
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
  const whereConditint: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  console.log(serchTerm, filtersData);
  const result = await prisma.academicSemester.findMany({
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

  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_SEMESTER_GET_ALL,
      JSON.stringify(result)
    );
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// get single data
const getSingById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });

  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_SEMESTER_GET_SINGLE,
      JSON.stringify(result)
    );
  }
  return result;
};
// update academicSemester
const UpdateAcademicSemester = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_SEMESTER_UPDATED,
      JSON.stringify(result)
    );
  }
  return result;
};
// Deleted single data
const DeletedSingById = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });

  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_SEMESTER_GET_DELETED,
      JSON.stringify(result)
    );
  }
  return result;
};
export const academicSemesterService = {
  insertIntoDB,
  getAcaSemDB,
  getSingById,
  UpdateAcademicSemester,
  DeletedSingById,
};
