import { Prisma } from '@prisma/client';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
  const statusCode = 400;
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
