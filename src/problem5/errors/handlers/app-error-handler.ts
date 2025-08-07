import { IErrorHandler } from "../../interfaces/error.interface";
import { AppError } from "../base/app-error";

export class AppErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof AppError;
  }

  handle(error: Error): {
    statusCode: number;
    message: string;
    errorCode?: string;
    details?: any;
  } {
    const appError = error as AppError;
    return {
      statusCode: appError.statusCode,
      message: appError.message,
      ...(appError.errorCode && { errorCode: appError.errorCode }),
      ...(appError.details && { details: appError.details }),
    };
  }
}
