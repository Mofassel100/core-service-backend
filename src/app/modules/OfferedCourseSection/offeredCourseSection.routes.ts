import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.Controller';
const router = express.Router();
router.post('/', OfferedCourseSectionController.insertIntoDB);
export const OfferedCourseSectionRoutus = router;
