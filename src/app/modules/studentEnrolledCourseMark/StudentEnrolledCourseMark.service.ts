import { ExamType, PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import prisma from '../../../shared/prisma';

const createEnrolledCourseMark = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrolledCourseId: string;
    academicSemesterId: string;
  }
) => {
  const isExistMidTearmData = await prisma.studentEnrolledCourseMark.findFirst({
    where: {
      examType: ExamType.MIDTERM,
      student: {
        id: payload.studentId,
      },
      studentEnrolledCourse: {
        id: payload.studentEnrolledCourseId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
    },
  });

  if (!isExistMidTearmData) {
    await prisma.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourse: {
          connect: {
            id: payload.studentEnrolledCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.FINAL,
      },
    });
  }

  const isExistFinalData = await prisma.studentEnrolledCourseMark.findFirst({
    where: {
      examType: ExamType.FINAL,
      student: {
        id: payload.studentId,
      },
      studentEnrolledCourse: {
        id: payload.studentEnrolledCourseId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
    },
  });
  if (!isExistFinalData) {
    await prisma.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourse: {
          connect: {
            id: payload.studentEnrolledCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.FINAL,
      },
    });
  }
};
export const StudentEnrolledCourseMarkService = {
  createEnrolledCourseMark,
};
