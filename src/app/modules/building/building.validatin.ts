import { z } from 'zod';

const createBuilding = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Requered',
    }),
  }),
});
const UpdateBuilding = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const BuildingValidation = {
  createBuilding,
  UpdateBuilding,
};
