import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClinet } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_GET_ALL,
  EVENT_ACADEMIC_DEPARTMENT_GET_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_GET_SINGLE,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
  academicDepartmentRelationalFields,
  academicDepartmentRelationalFieldsMapper,
  academicDepartmentSearchableFields,
} from './academicDepartment.contstant';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const inserAcademicDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_DEPARTMENT_CREATED,
      JSON.stringify(result)
    );
  }
  return result;
};
// get Aca.Dep All Data fecht
const getAcaDepDB = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentSearchableFields.map(field => ({
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
        if (academicDepartmentRelationalFields.includes(key)) {
          return {
            [academicDepartmentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    include: {
      academicFaculty: true,
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
  const total = await prisma.academicDepartment.count({
    where: whereConditions,
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_DEPARTMENT_GET_ALL,
      JSON.stringify(result)
    );
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
// get single AcademicSingleData
const getDepByIdDB = async (id: string) => {
  const result = await prisma.academicDepartment.findUnique({
    include: {
      academicFaculty: true,
    },
    where: {
      id,
    },
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_DEPARTMENT_GET_SINGLE,
      JSON.stringify(result)
    );
  }
  return result;
};
// update department
const updateAcaDep = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_DEPARTMENT_UPDATED,
      JSON.stringify(result)
    );
  }
  return result;
};
// get single AcademicSingleData
const DeletedDepByIdDB = async (id: string) => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  if (result) {
    RedisClinet.publish(
      EVENT_ACADEMIC_DEPARTMENT_GET_DELETED,
      JSON.stringify(result)
    );
  }
  return result;
};
export const AcademicDepartmentService = {
  inserAcademicDepartment,
  getAcaDepDB,
  getDepByIdDB,
  updateAcaDep,
  DeletedDepByIdDB,
};
