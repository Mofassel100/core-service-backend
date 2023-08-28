import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.UpdateFaculty),
  FacultyController.UpdateFacultyByIdDB
);
router.get('/:id', FacultyController.getFacultyByIdDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.DeletedFacultyByIdDB
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FacultyValidation.facultyCreate),
  FacultyController.insertFaculty
);

router.get('/', FacultyController.getFacultyDB);
router.post(
  '/:id/assign-courses',
  validateRequest(FacultyValidation.assignOrRemoceCourese),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.assignCourses
);
router.delete(
  '/:id/remove-courses',
  validateRequest(FacultyValidation.assignOrRemoceCourese),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.RemoveCourses
);
export const FacultyRouter = router;
