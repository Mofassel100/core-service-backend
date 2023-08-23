import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';
const router = express.Router();
router.patch(
  '/:id',

  validateRequest(StudentValidations.UpdateStudent),
  StudentController.UpdateStudent
);
router.get('/:id', StudentController.getStudentByIdDB);
router.post(
  '/',
  validateRequest(StudentValidations.studentcreate),
  StudentController.insertStudent
);
router.get('/', StudentController.getStudentDB);
export const StudentRooter = router;
