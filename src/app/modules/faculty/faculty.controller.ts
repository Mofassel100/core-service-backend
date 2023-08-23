import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const insertFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyData = req.body;
  const result = await FacultyService.insertFaculty(facultyData);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'facrult created successfull',
    data: result,
  });
});
// get faculty
const getFacultyDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await FacultyService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Faculty Sucess full',
    meta: result.meta,
    data: result.data,
  });
});
export const FacultyController = {
  insertFaculty,
  getFacultyDB,
};
