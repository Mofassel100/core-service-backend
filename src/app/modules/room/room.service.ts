import { Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  roomRelationalFields,
  roomRelationalFieldsMapper,
  roomSearchableFields,
} from './room.contstant';
import { IRoomFilterRequest } from './room.interface';

const insertIntoDB = async (data: Room): Promise<Room | null> => {
  const result = await prisma.room.create({
    data,
  });
  return result;
};
// get Room All Data fecht
const getFromDB = async (
  filters: IRoomFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: roomSearchableFields.map(field => ({
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
        if (roomRelationalFields.includes(key)) {
          return {
            [roomRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.room.findMany({
    include: {
      bulding: true,
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
  const total = await prisma.room.count({
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
// get single Room
const getFromByIdDB = async (id: string) => {
  const result = await prisma.room.findUnique({
    include: {
      bulding: true,
    },
    where: {
      id,
    },
  });
  return result;
};
// update Room
const updateFromDB = async (
  id: string,
  payload: Partial<Room>
): Promise<Room> => {
  const result = await prisma.room.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
// get single Room
const DeletedFromByIdDB = async (id: string) => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
  });
  return result;
};
export const RoomService = {
  DeletedFromByIdDB,
  insertIntoDB,
  getFromByIdDB,
  updateFromDB,
  getFromDB,
};
