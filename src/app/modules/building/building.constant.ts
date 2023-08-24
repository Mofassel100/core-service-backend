export const buildingFilterableFields: string[] = [
  'searchTerm',
  'id',
  'buildingId',
];

export const buildingSearchableFields: string[] = ['title'];

export const buildingRelationalFields: string[] = ['buildingId'];
export const buildingRelationalFieldsMapper: {
  [key: string]: string;
} = {
  buildingId: 'rooms',
};
