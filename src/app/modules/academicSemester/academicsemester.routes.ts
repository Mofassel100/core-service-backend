import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controler';
import { AcademicSemesterValidation } from './academictSemester.validationt';
const routes = express.Router();
routes.post(
  '/',
  validateRequest(AcademicSemesterValidation.createSemester),
  academicSemesterController.insertIntoDB
);
export const academictSemesterRouters = routes;
