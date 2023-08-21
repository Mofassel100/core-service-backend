import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const inserAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const DepData = req.body;
    const result = await AcademicDepartmentService.inserAcademicDepartment(
      DepData
    );
    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Created Academic Department',
      data: result,
    });
  }
);
export const AcademciDepartmentController = {
  inserAcademicDepartment,
};
