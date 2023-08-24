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
// get single Data
const getDepByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getDepByIdDB(id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Aca Dep single data',
    data: result,
  });
});
// update Academic Department
const updateAcaDep = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await AcademicDepartmentService.updateAcaDep(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Academic Department Succefull',
    data: result,
  });
});
// Deleted Academic Department
const DeletedDepByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.DeletedDepByIdDB(id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted AcademicDepartment',
    data: result,
  });
});
export const AcademciDepartmentController = {
  inserAcademicDepartment,
  getAcaDepDB,
  getDepByIdDB,
  updateAcaDep,
  DeletedDepByIdDB,
};
