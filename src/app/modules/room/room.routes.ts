import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();
router.patch(
  '/:id',
  validateRequest(RoomValidation.UpdateRoom),
  RoomController.UpdateFromDB
);
router.get('/:id', RoomController.getFromByIdDB);
router.delete('/:id', RoomController.DeletedFromByIdDB);
router.post(
  '/create',
  validateRequest(RoomValidation.createRoom),
  RoomController.insertIntoDB
);
router.get('/', RoomController.getFromAllDB);

export const RoomRouter = router;
