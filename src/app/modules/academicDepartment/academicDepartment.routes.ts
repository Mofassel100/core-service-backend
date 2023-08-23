import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academciDepartment.validation';
import { AcademciDepartmentController } from './academicDepart.controller';
const router = express.Router();
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.UpdateDepartment),
  AcademciDepartmentController.updateAcaDep
);
router.get('/:id', AcademciDepartmentController.getDepByIdDB);
router.post(
  '/create',
  validateRequest(AcademicDepartmentValidation.AcademicDepartmentValid),
  AcademciDepartmentController.inserAcademicDepartment
);
router.get('/', AcademciDepartmentController.getAcaDepDB);

export const AcademicDepartmentRouter = router;
