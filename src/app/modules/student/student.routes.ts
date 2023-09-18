import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.validation';
const router = express.Router();
router.get(
  '/my-course',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.myCourse
);
router.get(
  '/student-academic-info',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getMyStudentAccInfo
);
router.get(
  '/get-my-course-schedule',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentController.getMyCourseSchedules
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidations.UpdateStudent),
  StudentController.UpdateStudent
);
router.get('/:id', StudentController.getStudentByIdDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.DeletedStudentByIdDB
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidations.studentcreate),
  StudentController.insertStudent
);
router.get('/', StudentController.getStudentDB);
export const StudentRooter = router;
