import { IErrorHandler } from "../../interfaces/error.interface";

export class JWTErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError';
  }

  handle(error: Error) {
    const isExpired = error.name === 'TokenExpiredError';
    return {
      statusCode: 401,
      message: isExpired ? 'Token expired' : 'Invalid token',
      errorCode: isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
      details: undefined
    };
  }
}