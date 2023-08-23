import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.contstant';
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
// get All ACA.Facul Data fecht
const getAcaFaculData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicFacultyService.getAcaFaculData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Faculty DAta feach',
    meta: result.meta,
    data: result.data,
  });
});
// get aca fac data
const getAcaFacByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getAcaFacByIdDB(id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Single Data',
    data: result,
  });
});
// update academic Faculty
const updateAcaFacByIdDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await AcademicFacultyService.updateAcaFacByIdDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update academic-faculty',
    data: result,
  });
});
export const AcademicFacultyController = {
  inserAcademicFaculty,
  getAcaFaculData,
  getAcaFacByIdDB,
  updateAcaFacByIdDB,
};
