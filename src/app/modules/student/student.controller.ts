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

const DeletedStudentByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.DeletedStudentByIdDB(id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted single Studnet ',
    data: result,
  });
});
const myCourse = catchAsync(async (req: Request, res: Response) => {
  const User = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.myCourse(User.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched data successfylly ',
    data: result,
  });
});
const getMyCourseSchedules = catchAsync(async (req: Request, res: Response) => {
  const User = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.getMyCourseSchedules(User.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Schedule fetched data successfylly ',
    data: result,
  });
});
const getMyStudentAccInfo = catchAsync(async (req: Request, res: Response) => {
  const User = (req as any).user;
  const result = await StudentService.getMyStudentAccInfo(User.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Academic Info fetched data successfylly ',
    data: result,
  });
});
export const StudentController = {
  insertStudent,
  getStudentDB,
  getStudentByIdDB,
  UpdateStudent,
  DeletedStudentByIdDB,
  myCourse,
  getMyCourseSchedules,
  getMyStudentAccInfo,
};
