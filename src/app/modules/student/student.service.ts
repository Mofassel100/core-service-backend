import { Prisma, Student, StudentEnrolledCourseStatus } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constant';
import { IStudentFilterRequest } from './student.interface';
import { studentUtilies } from './studentUtilies';

const insertStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};
// get Student All
const getAllFromDB = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
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
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academcSemester: true,
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
  const total = await prisma.student.count({
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
// get single student data
const getStudentByIdDB = async (id: string) => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};
// Update Student
const UpdateStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
// Deleted single student data
const DeletedStudentByIdDB = async (id: string) => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academcSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};
const myCourse = async (
  authUser: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }

  const result = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUser,
      },
      ...filter,
    },
    include: {
      course: true,
      academicSemester: true,
    },
  });
  return result;
};
const getMyCourseSchedules = async (
  authUser: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }
  const studentEnrolledCourses = await myCourse(authUser, filter);
  const studentEnrolledCourseIds = studentEnrolledCourses.map(
    item => item.courseId
  );
  const result = await prisma.studentSemesterRegistrationCourse.findMany({
    where: {
      student: {
        studentId: authUser,
      },
      semesterRegistration: {
        academicsemester: {
          id: filter.academicSemesterId,
        },
      },
      offeredCourse: {
        course: {
          id: {
            in: studentEnrolledCourseIds,
          },
        },
      },
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
      offeredCourseSection: {
        include: {
          offeredCourseClassSchedules: {
            include: {
              faculty: true,
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
  return result;
};
const getMyStudentAccInfo = async (authUser: string) => {
  const studentAcaInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        studentId: authUser,
      },
    },
  });
  const EnrolledCourse = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUser,
      },
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
    include: {
      course: true,
      academicSemester: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const groupByAcademicSemester =
    studentUtilies.groupByAcademicSemester(EnrolledCourse);
  return {
    studentAcaInfo,
    course: groupByAcademicSemester,
  };
};
export const StudentService = {
  insertStudent,
  getAllFromDB,
  getStudentByIdDB,
  UpdateStudent,
  DeletedStudentByIdDB,
  myCourse,
  getMyCourseSchedules,
  getMyStudentAccInfo,
};
