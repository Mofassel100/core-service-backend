import { SemesterRegistration } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';
import { semesterRegistrationFilterableFields } from './semesterRegitration.constants';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDb(req.body);
  sendResponse<SemesterRegistration>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semesterRegistration created successfull',
    data: result,
  });
});
// // academic all data get
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, semesterRegistrationFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  // console.log('options', options);
  // console.log('filters', filters);
  const result = await SemesterRegistrationService.getAllFromDB(
    filters,
    options
  );
  sendResponse<SemesterRegistration[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Semester Created',
    meta: result.meta,
    data: result.data,
  });
});
// get single data
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.getSingById(req.params.id);
  sendResponse<SemesterRegistration | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration Get single Data',
    data: result,
  });
});
// Update SemesterRegitration
const UpdateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await SemesterRegistrationService.UpdateSemesterRegistration(
      id,
      data
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Semester Registration SuccessFull',
      data: result,
    });
  }
);
// get single data
const DeletedSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.DeletedSingById(
    req.params.id
  );
  sendResponse<SemesterRegistration | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted AcademicSemester single Data',
    data: result,
  });
});
const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const datas = (req as any).user?.userId;
  console.log(datas);
  const result = await SemesterRegistrationService.startMyRegistration(datas);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'start My Registration Data',
    data: result,
  });
});
const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const payload = req.body;
  const result = await SemesterRegistrationService.enrollIntoCourse(
    user.userId,
    payload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration Course SuccessFully',
    data: result,
  });
});
const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    const result = await SemesterRegistrationService.confirmMyRegistration(
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'confirmMyRegistration SuccessFully',
      data: result,
    });
  }
);
const WidreaFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const payload = req.body;
  const result = await SemesterRegistrationService.WidreaFromCourse(
    user.userId,
    payload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'widreafrom course Course SuccessFully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDB,
  UpdateSemesterRegistration,
  getAllFromDB,
  getSingleData,
  DeletedSingleData,
  startMyRegistration,
  enrollIntoCourse,
  WidreaFromCourse,
  confirmMyRegistration,
};
