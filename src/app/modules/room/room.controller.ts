import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterableFields } from './room.contstant';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const RoomData = req.body;
  const result = await RoomService.insertIntoDB(RoomData);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Room',
    data: result,
  });
});
// get Room From postgrace
const getFromAllDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await RoomService.getFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get from Room DB Success full',
    meta: result.meta,
    data: result.data,
  });
});
// get single Data Room
const getFromByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await RoomService.getFromByIdDB(id);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Room single data',
    data: result,
  });
});
// update Room
const UpdateFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await RoomService.updateFromDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Room From DB Succefull',
    data: result,
  });
});
// Deleted Remove From Room DB
const DeletedFromByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await RoomService.DeletedFromByIdDB(id);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Room',
    data: result,
  });
});
export const RoomController = {
  insertIntoDB,
  getFromAllDB,
  getFromByIdDB,
  UpdateFromDB,
  DeletedFromByIdDB,
};
