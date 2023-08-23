import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.contstant';
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
// get ACA.Dep All Data Fecht
const getAcaDepDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicDepartmentService.getAcaDepDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department GEt Success full',
    meta: result.meta,
    data: result.data,
  });
});
export const AcademciDepartmentController = {
  inserAcademicDepartment,
  getAcaDepDB,
};
