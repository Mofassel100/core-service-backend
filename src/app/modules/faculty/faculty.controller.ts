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
// get faculty single data
const getFacultyByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getFacultyByIdDB(id);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Faculty single data ',
    data: result,
  });
});
const UpdateFacultyByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await FacultyService.UpdateFaculty(id, data);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Faculty data ',
    data: result,
  });
});
// Deleted Faculty
const DeletedFacultyByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.DeletedFacultyByIdDB(id);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Faculty single data ',
    data: result,
  });
});

const assignCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataCourses = req.body.courses;
  const result = await FacultyService.assignCourses(id, dataCourses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});
const RemoveCourses = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataCourses = req.body.courses;
  const result = await FacultyService.RemoveCourses(id, dataCourses);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove course Faculty successfully',
    data: result,
  });
});
const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await FacultyService.myCourse(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty course fetched successfully',
    data: result,
  });
});

export const FacultyController = {
  insertFaculty,
  getFacultyDB,
  getFacultyByIdDB,
  UpdateFacultyByIdDB,
  DeletedFacultyByIdDB,
  assignCourses,
  RemoveCourses,
  myCourses,
};
