import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controler';
import { AcademicSemesterValidation } from './academictSemester.validationt';
const routes = express.Router();
routes.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.UpdataAcdemicSemester),
  academicSemesterController.UpdataAcdemicSemester
);
routes.get('/:id', academicSemesterController.getSingleData);
routes.delete('/:id', academicSemesterController.DeletedSingleData);
routes.get('/', academicSemesterController.getAcaSemDB);
routes.post(
  '/',

  academicSemesterController.insertIntoDB
);

export const academictSemesterRouters = routes;
