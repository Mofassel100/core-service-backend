import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacult),
  AcademicFacultyController.updateAcaFacByIdDB
);
router.get('/:id', AcademicFacultyController.getAcaFacByIdDB);
router.delete('/:id', AcademicFacultyController.DeletedAcaFacByIdDB);
router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.AcademicFacultyValidations),
  AcademicFacultyController.inserAcademicFaculty
);
router.get('/', AcademicFacultyController.getAcaFaculData);

export const AcademicFacultyRoutes = router;
