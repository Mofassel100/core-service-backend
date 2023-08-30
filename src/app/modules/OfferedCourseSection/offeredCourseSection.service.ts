import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any): Promise<OfferedCourseSection> => {
  const isExistOffCouData = await prisma.offeredCourse.findFirst({
    where: { id: data.offeredCourseId },
  });
  if (!isExistOffCouData) {
    throw new ApiError(httpStatus.OK, 'offeredCourseID does not exist');
  }
  data.semesterRegistrationId = isExistOffCouData.semesterRegistrationId;
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};
export const OfferedCourseSectionService = {
  insertIntoDB,
};
