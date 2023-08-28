import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.insertIntoDB
);
export const SemesterRegistrationRouter = router;
