import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controler';
import { AcademicSemesterValidation } from './academictSemester.validationt';
const routes = express.Router();
routes.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicSemesterValidation.UpdataAcdemicSemester),
  academicSemesterController.UpdataAcdemicSemester
);
routes.get('/:id', academicSemesterController.getSingleData);
routes.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicSemesterController.DeletedSingleData
);
routes.get('/', academicSemesterController.getAcaSemDB);
routes.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicSemesterController.insertIntoDB
);

export const academictSemesterRouters = routes;
