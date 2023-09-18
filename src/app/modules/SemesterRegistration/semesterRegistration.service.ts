import {
  Course,
  OfferedCourse,
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
  StudentEnrolledCourseStatus,
  StudentSemesterRegistration,
  StudentSemesterRegistrationCourse,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utilities';
import { StudentEnrolledCourseMarkService } from '../studentEnrolledCourseMark/StudentEnrolledCourseMark.service';

import { StudentSemesterPaymentServices } from '../studentSemesterPyment/studentSemesterPaymentServices';
import { studentSemesterRegistrationCourseService } from '../studentSemesterRegistrationCourse/studentSemesterRegistrationCourseService';
import {
  ISRegistrationCourseEnrooll,
  ISemesterRegistrationFilterRequest,
} from './semesterRegistration.interface';
import { semesterRegistrationUtilis } from './semesterRegistrationUtilities';
import { semesterRegistrationSearchableFields } from './semesterRegitration.constants';

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
const getAllFromDB = async (
  filters: ISemesterRegistrationFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: semesterRegistrationSearchableFields.map(filedPropery => ({
        [filedPropery]: {
          contains: searchTerm,
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
  const whereConditint: Prisma.SemesterRegistrationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.semesterRegistration.findMany({
    where: whereConditint,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
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
// get single data
const getSingById = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  return result;
};
// update academicSemester
const UpdateSemesterRegistration = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data not Found');
  }
  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.UPCOMING &&
    payload.status !== SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from UPCOMING to ONGOING'
    );
  }
  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.ONGOING &&
    payload.status !== SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from ONGOING to ENDED'
    );
  }
  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicsemester: true,
    },
  });
  return result;
};
// Deleted single data
const DeletedSingById = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
  });
  return result;
};
const startMyRegistration = async (
  authUser: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUser,
    },
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student Not found');
  }
  const semsterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          SemesterRegistrationStatus.UPCOMING,
          SemesterRegistrationStatus.ONGOING,
        ],
      },
    },
  });
  if (semsterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student Registration start not yet'
    );
  }

  let studentRegistration = await prisma.studentSemesterRegistration.findFirst({
    where: {
      semesterRegistration: {
        id: semsterRegistrationInfo?.id,
      },
      student: {
        id: studentInfo.id,
      },
    },
  });
  if (!studentRegistration) {
    studentRegistration = await prisma.studentSemesterRegistration.create({
      data: {
        semesterRegistration: {
          connect: {
            id: semsterRegistrationInfo?.id,
          },
        },
        student: {
          connect: {
            id: studentInfo.id,
          },
        },
      },
    });
  }

  return {
    semesterRegistration: semsterRegistrationInfo,
    studentSemesterRegistration: studentRegistration,
  };
};

const enrollIntoCourse = async (
  authUser: string,
  payload: ISRegistrationCourseEnrooll
): Promise<{ message: string }> => {
  return studentSemesterRegistrationCourseService.enrollIntoCourse(
    authUser,
    payload
  );
};
const WidreaFromCourse = async (
  authUser: string,
  payload: ISRegistrationCourseEnrooll
): Promise<{ message: string }> => {
  return studentSemesterRegistrationCourseService.WidreaFromCourse(
    authUser,
    payload
  );
};
const confirmMyRegistration = async (
  authUser: string
): Promise<{ message: string }> => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  const studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegistration?.id,
        },
        student: {
          studentId: authUser,
        },
      },
    });
  if (studentSemesterRegistration?.totalCreditsTaken === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student not any enroll course');
  }
  if (
    studentSemesterRegistration?.totalCreditsTaken &&
    semesterRegistration?.maxCredit &&
    semesterRegistration.minCredit &&
    (studentSemesterRegistration.totalCreditsTaken <
      semesterRegistration.minCredit ||
      studentSemesterRegistration.totalCreditsTaken >
        semesterRegistration.maxCredit)
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `You are take ${semesterRegistration.minCredit} to ${semesterRegistration.maxCredit} credites`
    );
  }
  await prisma.studentSemesterRegistration.update({
    where: {
      id: studentSemesterRegistration?.id,
    },
    data: {
      isConfirmed: true,
    },
  });
  return {
    message: 'Registration is confirms',
  };
  console.log(studentSemesterRegistration, semesterRegistration);
};
const getMyRegistration = async (authUser: string) => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
    include: {
      academicsemester: true,
      offeredCourseClassSchedules: true,
      offeredCourses: true,
      offeredCourseSections: true,
      studentSemesterRegistrationCourses: true,
      studentSemesterRegistrations: true,
    },
  });
  const studentSemesterRegistration =
    await prisma.studentSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegistration?.id,
        },
        student: {
          studentId: authUser,
        },
      },
      include: {
        student: true,
        semesterRegistration: true,
      },
    });

  return {
    semesterRegistration,
    studentSemesterRegistration,
  };
};
const startNewRegistration = async (
  id: string
): Promise<{ message: string }> => {
  const semesterRegistration = await prisma.semesterRegistration.findUnique({
    where: {
      id: id,
    },
    include: {
      academicsemester: true,
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'semesterRegistration not found'
    );
  }
  // if (semesterRegistration.status !== SemesterRegistrationStatus.ENDED) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'semesterRegistration ended not yet'
  //   );
  // }
  // if (semesterRegistration.academicsemester.isCurrent) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'semester is Already started');
  // }
  await prisma.$transaction(async prismaTratinsactionClient => {
    await prismaTratinsactionClient.academicSemester.updateMany({
      where: {
        isCurrent: true,
      },
      data: {
        isCurrent: false,
      },
    });
    await prismaTratinsactionClient.academicSemester.update({
      where: {
        id: semesterRegistration.academicsemester.id,
      },
      data: {
        isCurrent: true,
      },
    });
    const studentSemesterRegistration =
      await prismaTratinsactionClient.studentSemesterRegistration.findMany({
        where: {
          semesterRegistration: {
            id,
          },
          isConfirmed: true,
        },
      });
    asyncForEach(
      studentSemesterRegistration,
      async (studentSemRes: StudentSemesterRegistration) => {
        if (studentSemRes.totalCreditsTaken) {
          const totalPaymentAmount = studentSemRes.totalCreditsTaken * 5000;
          console.log(totalPaymentAmount);
          await StudentSemesterPaymentServices.createSemesterPayment(
            prismaTratinsactionClient,
            {
              studentId: studentSemRes.studentId,
              academicSemesterId: semesterRegistration.academicSemesterId,
              totalPaymentAmount: totalPaymentAmount,
            }
          );
        }
        const studentSemesterRegistrationCourse =
          await prisma.studentSemesterRegistrationCourse.findMany({
            where: {
              semesterRegistration: {
                id,
              },
              student: {
                id: studentSemRes.studentId,
              },
            },
            include: {
              student: true,
              semesterRegistration: true,
              offeredCourse: {
                include: {
                  course: true,
                },
              },
              offeredCourseSection: true,
            },
          });
        asyncForEach(
          studentSemesterRegistrationCourse,
          async (
            item: StudentSemesterRegistrationCourse & {
              offeredCourse: OfferedCourse & {
                Course: Course;
              };
            }
          ) => {
            const isExistEnrolledCourse =
              await prisma.studentEnrolledCourse.findFirst({
                where: {
                  studentId: item.studentId,
                  courseId: item.offeredCourse.courseID,
                  academicSemesterId: semesterRegistration.academicSemesterId,
                },
              });
            if (!isExistEnrolledCourse) {
              const StudentEnrollData = {
                studentId: item.studentId,
                courseId: item.offeredCourse.courseID,
                academicSemesterId: semesterRegistration.academicSemesterId,
              };
              const studentEnrolledCourseData =
                await prisma.studentEnrolledCourse.create({
                  data: StudentEnrollData,
                });
              await StudentEnrolledCourseMarkService.createEnrolledCourseMark(
                prismaTratinsactionClient,
                {
                  studentId: item.studentId,
                  studentEnrolledCourseId: studentEnrolledCourseData.id,
                  academicSemesterId: semesterRegistration.academicSemesterId,
                }
              );
            }
          }
        );
      }
    );
  });

  return {
    message: 'student New Semester Registratin  successfully',
  };
};
const getMySemesterRegCourse = async (authUserId: string) => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          SemesterRegistrationStatus.UPCOMING,
          SemesterRegistrationStatus.ONGOING,
        ],
      },
    },
  });
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no Semester Not found');
  }
  const studentCompletCorese = await prisma.studentEnrolledCourse.findMany({
    where: {
      status: StudentEnrolledCourseStatus.COMPLETED,
      student: {
        id: student?.id,
      },
    },
    include: {
      course: true,
    },
  });
  const studentCurrentSemesterTakenCourse =
    await prisma.studentSemesterRegistrationCourse.findMany({
      where: {
        student: {
          id: student?.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      include: {
        offeredCourse: true,
        offeredCourseSection: true,
      },
    });
  const offeredCourse = await prisma.offeredCourse.findMany({
    where: {
      semesterRegistration: {
        id: semesterRegistration.id,
      },
      academicDepartment: {
        id: student?.academicDepartmentId,
      },
    },
    include: {
      course: {
        include: {
          preRequisite: {
            include: {
              preRequisite: true,
            },
          },
        },
      },
      offeredCourseSections: {
        include: {
          offeredCourseClassSchedules: {
            include: {
              room: {
                include: {
                  bulding: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const avalaibleCourse = semesterRegistrationUtilis.getAvailableCourse(
    offeredCourse,
    studentCompletCorese,
    studentCurrentSemesterTakenCourse
  );
  // console.log(avalaibleCourse);
  return avalaibleCourse;
};
export const SemesterRegistrationService = {
  insertIntoDb,
  UpdateSemesterRegistration,
  getAllFromDB,
  getSingById,
  DeletedSingById,
  startMyRegistration,
  enrollIntoCourse,
  WidreaFromCourse,
  confirmMyRegistration,
  getMyRegistration,
  startNewRegistration,
  getMySemesterRegCourse,
};
