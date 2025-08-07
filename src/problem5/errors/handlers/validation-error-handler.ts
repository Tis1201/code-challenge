import { IErrorHandler } from "../../interfaces/error.interface";
import { ValidationError } from "../custom/validation-error";

export class ValidationErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof ValidationError;
  }

  handle(error: Error) {
    const validationError = error as ValidationError;
    return {
      statusCode: 400,
      message: validationError.message,
      errorCode: validationError.errorCode || 'VALIDATION_ERROR',
      details: validationError.errors
    };
  }
}