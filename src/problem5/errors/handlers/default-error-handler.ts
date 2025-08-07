import { IErrorHandler } from "../../interfaces/error.interface";

export class DefaultErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return true; // Always can handle as fallback
  }

  handle(error: Error) {
    console.error('UNHANDLED ERROR (not a custom AppError type):', error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      errorCode: 'SERVER_ERROR',
      details: undefined
    };
  }
}