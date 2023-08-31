import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.Controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();
router.post(
  '/',
  validateRequest(OfferedCourseValidation.createOfferedCourse),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  OfferedCourseController.updateOneInDB
);
router.get(
  '/:id',

  OfferedCourseController.getByIdFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  OfferedCourseController.deleteByIdFromDB
);
router.get('/', OfferedCourseController.getAllFromDB);

export const OfferedCourseRouter = router;
