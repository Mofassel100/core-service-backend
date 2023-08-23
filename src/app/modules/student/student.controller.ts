import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const insertStudent = catchAsync(async (req: Request, res: Response) => {
  const studentData = req.body;
  const result = await StudentService.insertStudent(studentData);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'created student SuccessFull',
    data: result,
  });
});
// get Student All Data
const getStudentDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Student All Data ',
    meta: result.meta,
    data: result.data,
  });
});
const getStudentByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getStudentByIdDB(id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single Studnet ',
    data: result,
  });
});
// Update Student
const UpdateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await StudentService.UpdateStudent(id, data);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Student Success Full',
    data: result,
  });
});
export const StudentController = {
  insertStudent,
  getStudentDB,
  getStudentByIdDB,
  UpdateStudent,
};
