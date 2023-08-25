import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const preData = req.body;
  const result = await CourseService.insertIntoDB(preData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'courese Created success full',
    data: result,
  });
});
export const CourseController = {
  insertIntoDB,
};
