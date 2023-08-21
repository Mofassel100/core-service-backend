import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const inserAcademicFaculty = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};
export const AcademicFacultyService = {
  inserAcademicFaculty,
};
