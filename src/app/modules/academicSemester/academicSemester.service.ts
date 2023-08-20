import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AFilterSerchTerm } from './academciSemester.interface';
import { AcademicFilterSerceProperty } from './academicSemester.contanst';
// import {paginationHelpers}from "../../../helpers/paginationHelper"

const prisma = new PrismaClient();
const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
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
        : { createAt: 'desc' },
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
export const academicSemesterService = {
  insertIntoDB,
  getAcaSemDB,
};
