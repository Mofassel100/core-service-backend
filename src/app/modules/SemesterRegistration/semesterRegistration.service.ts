import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

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
export const SemesterRegistrationService = {
  insertIntoDb,
};
