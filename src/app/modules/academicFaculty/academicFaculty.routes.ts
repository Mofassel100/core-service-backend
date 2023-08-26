import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicFacultyValidation.updateAcademicFacult),
  AcademicFacultyController.updateAcaFacByIdDB
);
router.get('/:id', AcademicFacultyController.getAcaFacByIdDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.DeletedAcaFacByIdDB
);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicFacultyValidation.AcademicFacultyValidations),
  AcademicFacultyController.inserAcademicFaculty
);
router.get('/', AcademicFacultyController.getAcaFaculData);

export const AcademicFacultyRoutes = router;
