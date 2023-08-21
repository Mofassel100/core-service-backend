import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academciDepartment.validation';
import { AcademciDepartmentController } from './academicDepart.controller';
const router = express.Router();
router.post(
  '/create',
  validateRequest(AcademicDepartmentValidation.AcademicDepartmentValid),
  AcademciDepartmentController.inserAcademicDepartment
);

export const AcademicDepartmentRouter = router;
