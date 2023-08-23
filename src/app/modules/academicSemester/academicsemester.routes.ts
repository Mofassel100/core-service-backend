import express from 'express';
import { academicSemesterController } from './academicSemester.controler';
const routes = express.Router();
routes.get('/:id', academicSemesterController.getSingleData);
routes.get('/', academicSemesterController.getAcaSemDB);
routes.post(
  '/',

  academicSemesterController.insertIntoDB
);

export const academictSemesterRouters = routes;
