import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constant';
import { BuildingService } from './building.service';

const inserBuilding = catchAsync(async (req: Request, res: Response) => {
  const DepData = req.body;
  const result = await BuildingService.inserBuilding(DepData);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Academic Department',
    data: result,
  });
});
// get ACA.Dep All Data Fecht
const getBuildingDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BuildingService.getBuildingDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building GEt Success full',
    meta: result.meta,
    data: result.data,
  });
});
// get single Data
const BuildingByIdDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BuildingService.getbuildingByIdDB(id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Aca Dep single data',
    data: result,
  });
});
// update Academic Department
const UpdateBuilding = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await BuildingService.UpdateBuilding(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Building Succefull',
    data: result,
  });
});
// Deleted Academic Department
const DeletedBuildingByIdDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BuildingService.DeletedBuildingByIdDB(id);
    sendResponse<Building>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted Building',
      data: result,
    });
  }
);
export const BuildingController = {
  inserBuilding,
  UpdateBuilding,
  DeletedBuildingByIdDB,
  BuildingByIdDB,
  getBuildingDB,
};
