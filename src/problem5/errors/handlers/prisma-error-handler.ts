import { IErrorHandler } from "../../interfaces/error.interface";

export class PrismaValidationErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error.name === 'PrismaClientValidationError';
  }

  handle(error: Error) {
    return {
      statusCode: 400,
      message: 'Validation Error (Prisma)',
      errorCode: 'PRISMA_VALIDATION_ERROR',
      details: { 
        originalMessage: error.message,
        type: 'validation'
      }
    };
  }
}