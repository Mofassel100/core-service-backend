import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  SemesterRegistrationController.UpdateSemesterRegistration
);
// routes.get('/:id', academicSemesterController.getSingleData);
// routes.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   academicSemesterController.DeletedSingleData
// );
router.get('/', SemesterRegistrationController.getAllFromDB);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.insertIntoDB
);
export const SemesterRegistrationRouter = router;
