import {
  ExamType,
  PrismaClient,
  StudentEnrolledCourseMark,
} from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IStudentEnrolledCourseMarkFilterRequest } from './studentEnrolledCourseMark.interfacel';
import { studentEnrolledCourseMarkUtilis } from './studentEnrolledCourseMarkUtilis';

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

const getAllFromDB = async (
  filters: IStudentEnrolledCourseMarkFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<StudentEnrolledCourseMark[]>> => {
  const { limit, page } = paginationHelpers.calculatePagination(options);

  const marks = await prisma.studentEnrolledCourseMark.findMany({
    where: {
      student: {
        id: filters.studentId,
      },
      academicSemester: {
        id: filters.academicSemesterId,
      },
      studentEnrolledCourse: {
        course: {
          id: filters.courseId,
        },
      },
    },
    include: {
      studentEnrolledCourse: {
        include: {
          course: true,
        },
      },
      student: true,
    },
  });

  return {
    meta: {
      total: marks.length,
      page,
      limit,
    },
    data: marks,
  };
};

const updateStudentMidtermMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId, examType, marks } = payload;
  const studentEnrolledCourseMark =
    await prisma.studentEnrolledCourseMark.findFirst({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourse: {
          course: {
            id: courseId,
          },
        },
        examType,
      },
    });
  if (!studentEnrolledCourseMark) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'student Enrolled Course Mark not found'
    );
  }
  const result = studentEnrolledCourseMarkUtilis.getGradeupdateMarks(marks);
  const updatGrate = await prisma.studentEnrolledCourseMark.updateMany({
    where: {
      id: studentEnrolledCourseMark.id,
    },
    data: {
      grade: result.grade,
      marks,
    },
  });
  return updatGrate;
};
const updateStudentFinalMarks = async (payload: any) => {
  console.log(payload);
  const studentEnrolledCourse = await prisma.studentEnrolledCourse.findFirst({
    where: {
      student: {
        id: payload.studentId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
      course: {
        id: payload.courseId,
      },
    },
  });
  if (!studentEnrolledCourse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'studentEnrolledCourse not found'
    );
  }
  const studentEnrolledCourseMark =
    await prisma.studentEnrolledCourseMark.findMany({
      where: {
        student: {
          id: payload.studentId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
        studentEnrolledCourse: {
          course: {
            id: payload.courseId,
          },
        },
      },
    });
  if (!studentEnrolledCourseMark.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enroll course mark not found'
    );
  }
  const midtermMark =
    studentEnrolledCourseMark.find(item => item.examType === ExamType.MIDTERM)
      ?.marks || 0;
  const finalMark =
    studentEnrolledCourseMark.find(item => item.examType === ExamType.FINAL)
      ?.marks || 0;

  const totalFinalMark =
    Math.ceil(midtermMark * 0.4) + Math.ceil(finalMark * 0.6);
  const result =
    studentEnrolledCourseMarkUtilis.getGradeupdateMarks(totalFinalMark);
  await prisma.studentEnrolledCourse.updateMany({
    where: {
      student: {
        id: payload.studentId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
      course: {
        id: payload.courseId,
      },
    },
    data: {
      grade: result.grade,
      point: result.point,
      totalMarks: totalFinalMark,
    },
  });
  console.log(result);
};
export const StudentEnrolledCourseMarkService = {
  createEnrolledCourseMark,
  getAllFromDB,
  updateStudentMidtermMarks,
  updateStudentFinalMarks,
};
