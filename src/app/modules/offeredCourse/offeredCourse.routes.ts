import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.Controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

// router.patch(
//   '/:id',
//   validateRequest(SemesterRegistrationValidation.update),
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

//   SemesterRegistrationController.UpdateSemesterRegistration
// );
// router.get(
//   '/:id',

//   SemesterRegistrationController.getSingleData
// );
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   SemesterRegistrationController.DeletedSingleData
// );
// router.get('/', SemesterRegistrationController.getAllFromDB);
router.post(
  '/',
  validateRequest(OfferedCourseValidation.createOfferedCourse),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.insertIntoDB
);
export const OfferedCourseRouter = router;
