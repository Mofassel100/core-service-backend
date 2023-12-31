import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseSectionController } from './offeredCourseSection.Controller';
import { OfferedCourseSectionValidation } from './offeredCourseSection.validation';
const router = express.Router();
router.post(
  '/',

  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseSectionController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseSectionValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),

  OfferedCourseSectionController.updateOneInDB
);
router.get(
  '/:id',

  OfferedCourseSectionController.getByIdFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  OfferedCourseSectionController.deleteByIdFromDB
);
router.get('/', OfferedCourseSectionController.getAllFromDB);
export const OfferedCourseSectionRoutus = router;
