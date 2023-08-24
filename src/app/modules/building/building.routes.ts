import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validatin';
const router = express.Router();
router.patch(
  '/:id',
  validateRequest(BuildingValidation.UpdateBuilding),
  BuildingController.UpdateBuilding
);
router.get('/:id', BuildingController.BuildingByIdDB);
router.delete('/:id', BuildingController.DeletedBuildingByIdDB);
router.post(
  '/create',
  validateRequest(BuildingValidation.createBuilding),
  BuildingController.inserBuilding
);
router.get('/', BuildingController.getBuildingDB);

export const BuildingRouter = router;
