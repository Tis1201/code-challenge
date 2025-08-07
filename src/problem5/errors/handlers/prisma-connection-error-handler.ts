import { IErrorHandler } from "../../interfaces/error.interface";

export class PrismaConnectionErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error.name === 'PrismaClientInitializationError' || 
           error.name === 'PrismaClientRustPanicError';
  }

  handle(error: Error) {
    const isInitError = error.name === 'PrismaClientInitializationError';
    
    return {
      statusCode: 503,
      message: isInitError ? 'Database connection failed' : 'Database engine error',
      errorCode: isInitError ? 'DATABASE_CONNECTION_ERROR' : 'DATABASE_ENGINE_ERROR',
      details: {
        originalMessage: error.message,
        type: error.name
      }
    };
  }
}