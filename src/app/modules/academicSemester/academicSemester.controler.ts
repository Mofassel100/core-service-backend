import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  controllerPaginations,
  filterControllerSerTers,
} from './academicSemester.contanst';
import { academicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Semester Created',
    data: result,
  });
});
// academic all data get
const getAcaSemDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterControllerSerTers);
  const options = pick(req.query, controllerPaginations);

  // console.log('options', options);
  // console.log('filters', filters);
  const result = await academicSemesterService.getAcaSemDB(filters, options);
  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Semester Created',
    meta: result.meta,
    data: result.data,
  });
});
// get single data
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.getSingById(req.params.id);
  sendResponse<AcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Semester Get single Data',
    data: result,
  });
});
// Update AcademciSemester
const UpdataAcdemicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await academicSemesterService.UpdateAcademicSemester(
      id,
      data
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Academic Semester',
      data: result,
    });
  }
);
// get single data
const DeletedSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.DeletedSingById(req.params.id);
  sendResponse<AcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted AcademicSemester single Data',
    data: result,
  });
});
export const academicSemesterController = {
  insertIntoDB,
  getAcaSemDB,
  getSingleData,
  UpdataAcdemicSemester,
  DeletedSingleData,
};
