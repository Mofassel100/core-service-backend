import express from 'express';
import { OfferedCourseSectionRoutus } from '../modules/OfferedCourseSection/offeredCourseSection.routes';
import { SemesterRegistrationRouter } from '../modules/SemesterRegistration/semesterRegistration.routes';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academictSemesterRouters } from '../modules/academicSemester/academicsemester.routes';
import { BuildingRouter } from '../modules/building/building.routes';
import { CourseRouter } from '../modules/courses/course.routes';
import { FacultyRouter } from '../modules/faculty/faculty.router';
import { OfferedCourseRouter } from '../modules/offeredCourse/offeredCourse.routes';
import { RoomRouter } from '../modules/room/room.routes';
import { StudentRooter } from '../modules/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: academictSemesterRouters,
  },
  {
    path: '/academic-faculty',
    routes: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    routes: AcademicDepartmentRouter,
  },
  {
    path: '/student',
    routes: StudentRooter,
  },
  {
    path: '/faculty',
    routes: FacultyRouter,
  },
  {
    path: '/building',
    routes: BuildingRouter,
  },
  {
    path: '/rooms',
    routes: RoomRouter,
  },
  {
    path: '/courses',
    routes: CourseRouter,
  },
  {
    path: '/semester-registration',
    routes: SemesterRegistrationRouter,
  },
  {
    path: '/offered-course',
    routes: OfferedCourseRouter,
  },
  {
    path: '/offered-course-section',
    routes: OfferedCourseSectionRoutus,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
