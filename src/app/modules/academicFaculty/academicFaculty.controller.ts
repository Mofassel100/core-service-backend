import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const inserAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultData = req.body;
  const result = await AcademicFacultyService.inserAcademicFaculty(facultData);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created',
    data: result,
  });
});
export const AcademicFacultyController = {
  inserAcademicFaculty,
};
