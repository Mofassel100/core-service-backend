import { Faculty, Prisma, courseFaculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClinet } from '../../../shared/redis';
import {
  EVENT_FACULTY_CREATED,
  facultyRelationalFields,
  facultyRelationalFieldsMapper,
  facultySearchableFields,
} from './faculty.constant';
import { IFacultyFilterRequest } from './faculty.interface';

const insertFaculty = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  if (result) {
    RedisClinet.publish(EVENT_FACULTY_CREATED, JSON.stringify(result));
  }
  return result;
};
// get all faculty
const getAllFromDB = async (
  filters: IFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: facultySearchableFields.map(field => ({
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
        if (facultyRelationalFields.includes(key)) {
          return {
            [facultyRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    include: {
      academicFaculty: true,
      academicDepartment: true,
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
  const total = await prisma.faculty.count({
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
//  get faculty single data
const getFacultyByIdDB = async (id: string) => {
  const result = await prisma.faculty.findUnique({
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
    where: {
      id,
    },
  });
  return result;
};
// Update Faculty
const UpdateFaculty = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
// Deleted Faculty
const DeletedFacultyByIdDB = async (id: string) => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

const assignCourses = async (
  id: string,
  payload: string[]
): Promise<courseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload?.map(courseData => ({
      facultyId: id,
      courseID: courseData,
    })),
  });
  const assingCourses = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });
  return assingCourses;
};
const RemoveCourses = async (
  id: string,
  payload: string[]
): Promise<courseFaculty[]> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseID: {
        in: payload,
      },
    },
  });
  const remainingCourses = await prisma.courseFaculty.findMany({
    where: {
      courseID: id,
    },
    include: {
      course: true,
    },
  });
  return remainingCourses;
};

const myCourse = async (
  authUser: string,
  filter: {
    courseId?: string | null | undefined;
    academicSemesterId?: string | null | undefined;
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
  const offeredCourseSection = await prisma.offeredCourseSection.findMany({
    where: {
      offeredCourseClassSchedules: {
        some: {
          faculty: {
            facultyId: authUser,
          },
        },
      },
      offerdCourse: {
        semesterRegistration: {
          academicsemester: {
            id: filter.academicSemesterId,
          },
        },
      },
    },
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
      offerdCourse: {
        include: { course: true },
      },
    },
  });

  const courseAndSchedule = offeredCourseSection.reduce(
    (acc: any, obj: any) => {
      const course = obj.offerdCourse.course;
      const classSchedules = obj.offeredCourseClassSchedules;
      const existingCourse = acc.find(
        (item: any) => item.courese?.id === course?.id
      );
      if (existingCourse) {
        existingCourse.sections.push({
          section: obj,
          classSchedules,
        });
      } else {
        acc.push({
          course,
          sections: [
            {
              section: obj,
              classSchedules,
            },
          ],
        });
      }
      return acc;
      console.log(existingCourse);
    },

    []
  );
  return courseAndSchedule;
  // const result = await prisma.studentEnrolledCourse.findMany({
  //   where: {
  //     student: {
  //       studentId: authUser,
  //     },
  //     ...filter,
  //   },
  //   include: {
  //     course: true,
  //     academicSemester: true,
  //   },
  // });
};

const createFacultyEvent = (e: any) => {
  const facyltyDataData: Partial<Faculty> = {
    facultyId: e.id,
    firstName: e.name.firstName,
    lastName: e.name.lastName,
    middeName: e.name.middleName,
    gender: e.gender,
    email: e.email,
    designation: e.designation,
    contactNo: e.contactNo,
    bloodgroup: e.bloodGroup,
    academicFacultyId: e.academicFaculty.syncId,
    academicDepartmentId: e.academicDepartment.syncId,
  };
  insertFaculty(facyltyDataData as Faculty);
};
const UpdateEventFaculty = async (e: any): Promise<void> => {
  const isExistFacultyId = await prisma.faculty.findFirst({
    where: {
      facultyId: e.id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  if (!isExistFacultyId) {
    createFacultyEvent(e);
  } else {
    const facyltyData: Partial<Faculty> = {
      facultyId: e.id,
      firstName: e.name.firstName,
      lastName: e.name.lastName,
      middeName: e.name.middleName,
      gender: e.gender,
      email: e.email,
      designation: e.designation,
      contactNo: e.contactNo,
      bloodgroup: e.bloodGroup,
      academicFacultyId: e.academicFaculty.syncId,
      academicDepartmentId: e.academicDepartment.syncId,
    };
    const res = await prisma.faculty.updateMany({
      where: {
        facultyId: e.id,
      },
      data: facyltyData,
    });
    console.log(res);
  }
};
const getEventSingleData = async (e: any) => {
  const response = await prisma.faculty.findFirst({
    where: {
      facultyId: e.id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return response;
};
const getEventAllData = async () => {
  const response = await prisma.faculty.findMany({
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return response;
};
// const DeleteEventSingleDB = async (e: ayn) => {
//   const response = await prisma.faculty.delete({
//     where: {
//       facultyId: e.id,
//     },
//   });
//   return response;
// };

export const FacultyService = {
  insertFaculty,
  getAllFromDB,
  getFacultyByIdDB,
  UpdateFaculty,
  DeletedFacultyByIdDB,
  assignCourses,
  RemoveCourses,
  myCourse,
  createFacultyEvent,
  UpdateEventFaculty,
  getEventSingleData,
  getEventAllData,
};
