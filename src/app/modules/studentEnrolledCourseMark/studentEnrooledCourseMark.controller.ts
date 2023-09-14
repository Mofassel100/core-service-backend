import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentEnrolledCourseMarkService } from './StudentEnrolledCourseMark.service';
import { studentEnrolledCourseMarkFilterableFields } from './studentEnrolledCourseMark.constant';
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await StudentEnrolledCourseMarkService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student course marks fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateStudentMidtermMarks = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await StudentEnrolledCourseMarkService.updateStudentMidtermMarks(
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'marks updated!',
      data: result,
    });
  }
);
const updateStudentFinalMarks = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await StudentEnrolledCourseMarkService.updateStudentFinalMarks(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'marks Final updated!',
      data: result,
    });
  }
);

export const StudentEnrolledCourseMarkConroller = {
  getAllFromDB,
  updateStudentMidtermMarks,
  updateStudentFinalMarks,
};
