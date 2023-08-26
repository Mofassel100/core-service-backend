import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validatin';
const router = express.Router();
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BuildingValidation.UpdateBuilding),
  BuildingController.UpdateBuilding
);
router.get('/:id', BuildingController.BuildingByIdDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BuildingController.DeletedBuildingByIdDB
);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BuildingValidation.createBuilding),
  BuildingController.inserBuilding
);
router.get('/', BuildingController.getBuildingDB);

export const BuildingRouter = router;
