import { IErrorHandler } from "../../interfaces/error.interface";

export class PrismaUnknownErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error.name === 'PrismaClientUnknownRequestError';
  }

  handle(error: Error) {
    return {
      statusCode: 500,
      message: 'Unknown database error',
      errorCode: 'PRISMA_UNKNOWN_ERROR',
      details: {
        originalMessage: error.message
      }
    };
  }
}