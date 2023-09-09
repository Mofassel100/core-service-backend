import { SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ISRegistrationCourseEnrooll } from '../SemesterRegistration/semesterRegistration.interface';

const enrollIntoCourse = async (
  authUser: string,
  payload: ISRegistrationCourseEnrooll
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUser,
    },
  });
  if (!student) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student Not Found');
  }
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourse Not Found');
  }
  if (!offeredCourseSection) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourse Section Not Found');
  }
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester Registration Not Found');
  }
  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection.currentlyEnrolledStudent &&
    offeredCourseSection.currentlyEnrolledStudent >=
      offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student capacity is full !');
  }
  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.create({
      data: {
        semesterRegistrationId: semesterRegistration.id,
        studentId: student.id,
        offeredCourseId: payload.offeredCourseId,
        offeredCourseSectionId: payload.offeredCourseSectionId,
      },
    });
    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });
    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        totalCreditsTaken: {
          increment: offeredCourse.course.credits,
        },
      },
    });
  });

  return {
    message: 'student enroll Successfull',
  };
};
const WidreaFromCourse = async (
  authUser: string,
  payload: ISRegistrationCourseEnrooll
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUser,
    },
  });

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!student) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student Not Found');
  }
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourse Not Found');
  }
  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester Registration Not Found');
  }

  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegistration.id,
          studentId: student.id,
          offeredCourseId: offeredCourse.id,
        },
      },
    });
    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          decrement: 1,
        },
      },
    });
    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        totalCreditsTaken: {
          decrement: offeredCourse.course.credits,
        },
      },
    });
  });

  return {
    message: 'student widraw from course Successfull',
  };
};
export const studentSemesterRegistrationCourseService = {
  enrollIntoCourse,
  WidreaFromCourse,
};
