import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();
router.post(
  '/',
  validateRequest(FacultyValidation.facultyCreate),
  FacultyController.insertFaculty
);
router.get('/', FacultyController.getFacultyDB);
export const FacultyRouter = router;