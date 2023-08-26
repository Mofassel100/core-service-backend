import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academciDepartment.validation';
import { AcademciDepartmentController } from './academicDepart.controller';
const router = express.Router();
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicDepartmentValidation.UpdateDepartment),
  AcademciDepartmentController.updateAcaDep
);
router.get('/:id', AcademciDepartmentController.getDepByIdDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademciDepartmentController.DeletedDepByIdDB
);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicDepartmentValidation.AcademicDepartmentValid),
  AcademciDepartmentController.inserAcademicDepartment
);
router.get('/', AcademciDepartmentController.getAcaDepDB);

export const AcademicDepartmentRouter = router;
