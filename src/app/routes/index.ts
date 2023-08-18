import express from 'express';
import { academictSemesterRouters } from '../modules/academicSemester/academicsemester.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: academictSemesterRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
