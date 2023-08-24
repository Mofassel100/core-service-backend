import { z } from 'zod';

const createBuilding = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Requered',
    }),
    buildingId: z
      .string({
        required_error: ' building Is Required',
      })
      .optional(),
  }),
});
const UpdateBuilding = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    buildingId: z
      .string({
        required_error: ' building Is Required',
      })
      .optional(),
  }),
});

export const BuildingValidation = {
  createBuilding,
  UpdateBuilding,
};
