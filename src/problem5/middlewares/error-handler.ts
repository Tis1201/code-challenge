import { Request, Response, NextFunction } from 'express';
import { ErrorHandlerFactory } from '../errors/factory/error-handler-factory';
import { AppError } from '../errors/base/app-error';
import { ErrorFactory } from '../errors/factory/error-factory';
import { IErrorResponse } from '../interfaces/error.interface';

export class GlobalErrorHandler {
  static handle = (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (res.headersSent) {
      console.error('ERROR: Headers already sent to client. Cannot send new error response.', error);
      return next(error);
    }

    // Use factory to get appropriate handler
    const handler = ErrorHandlerFactory.getHandler(error);
    const errorInfo = handler.handle(error);

    // Log error details
    console.error('GLOBAL_ERROR_HANDLER_LOG:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString(),
      details: errorInfo.details,
      handler: handler.constructor.name
    });

    // Build error response
    const errorResponse: IErrorResponse = {
      success: false,
      error: {
        message: errorInfo.message,
        statusCode: errorInfo.statusCode,
        errorCode: errorInfo.errorCode || undefined,
        timestamp: new Date().toISOString(),
        path: req.path,
        details: errorInfo.details
      }
    };

    // Add stack trace in development
    if (process.env.NODE_ENV === 'development') {
      errorResponse.error.stack = error.stack;
    }

    res.status(errorInfo.statusCode).json(errorResponse);
  };

  static notFound = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (res.headersSent) {
      return next();
    }

    const error = ErrorFactory.custom(
      `Route ${req.originalUrl} not found`, 
      404, 
      'NOT_FOUND'
    );
    next(error);
  };

  static asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
}