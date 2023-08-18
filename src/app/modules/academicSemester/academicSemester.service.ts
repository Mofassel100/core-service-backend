import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};
export const academicSemesterService = {
  insertIntoDB,
};
