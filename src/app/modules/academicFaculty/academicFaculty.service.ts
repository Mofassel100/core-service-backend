import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClinet } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_GET_ALL,
  EVENT_ACADEMIC_FACULTY_GET_DELETED,
  EVENT_ACADEMIC_FACULTY_GET_SINGLE,
  EVENT_ACADEMIC_FACULTY_UPDATED,
  academicFacultySearchableFields,
} from './academicFaculty.contstant';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';

const inserAcademicFaculty = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  if (result) {
    RedisClinet.publish(EVENT_ACADEMIC_FACULTY_CREATED, JSON.stringify(result));
  }
  return result;
};
// get AcademicFaculty All Data feach
const getAcaFaculData = async (
  fiters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = fiters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: academicFacultySearchableFields.map(field => ({
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
  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicFaculty.findMany({
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
  const total = await prisma.academicFaculty.count({
    where: whereConditions,
  });
  if (result) {
    RedisClinet.publish(EVENT_ACADEMIC_FACULTY_GET_ALL, JSON.stringify(result));
  }
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
// get single data
const getAcaFacByIdDB = async (id: string) => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_FACULTY_GET_SINGLE,
      JSON.stringify(result)
    );
  }
  return result;
};
const updateAcaFacByIdDB = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data: payload,
  });
  if (result) {
    RedisClinet.publish(EVENT_ACADEMIC_FACULTY_UPDATED, JSON.stringify(result));
  }
  return result;
};
// Deleted AcademicFaculty
const DeletedAcaFacByIdDB = async (id: string) => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_FACULTY_GET_DELETED,
      JSON.stringify(result)
    );
  }
  return result;
};
export const AcademicFacultyService = {
  inserAcademicFaculty,
  getAcaFaculData,
  getAcaFacByIdDB,
  updateAcaFacByIdDB,
  DeletedAcaFacByIdDB,
};
