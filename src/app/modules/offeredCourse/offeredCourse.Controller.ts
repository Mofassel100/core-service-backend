import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const CourseData = req.body;
  // console.log(CourseData);
  const result = await OfferedCourseService.insertIntoDB(CourseData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse created SuccessFull',
    data: result,
  });
});
export const OfferedCourseController = {
  insertIntoDB,
};
