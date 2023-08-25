import { z } from 'zod';

const createRoom = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'roomNumber is Required',
    }),
    floor: z.string({
      required_error: 'floor is Required',
    }),
    buildingId: z.string({
      required_error: ' buildingID Is Required',
    }),
  }),
});
const UpdateRoom = z.object({
  body: z.object({
    roomNumber: z
      .string({
        required_error: 'roomNumber is Required',
      })
      .optional(),
    floor: z
      .string({
        required_error: 'floor is Required',
      })
      .optional(),
    buildingId: z
      .string({
        required_error: ' buildingID Is Required',
      })
      .optional(),
  }),
});

export const RoomValidation = {
  createRoom,
  UpdateRoom,
};
