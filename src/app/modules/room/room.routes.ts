import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(RoomValidation.UpdateRoom),
  RoomController.UpdateFromDB
);
router.get('/:id', RoomController.getFromByIdDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RoomController.DeletedFromByIdDB
);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(RoomValidation.createRoom),
  RoomController.insertIntoDB
);
router.get('/', RoomController.getFromAllDB);

export const RoomRouter = router;
