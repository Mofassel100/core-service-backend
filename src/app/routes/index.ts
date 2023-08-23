import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academictSemesterRouters } from '../modules/academicSemester/academicsemester.routes';
import { FacultyRouter } from '../modules/faculty/faculty.router';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
