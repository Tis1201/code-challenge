import { FormattedError } from "../../interfaces/error.interface";
import { AppError } from "../base/app-error";
import { DatabaseError } from "../custom/database-errors";
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from "../custom/http-errors";
import {  ValidationError } from "../custom/validation-error";

export class ErrorFactory {
  static validation(message: string, field?: string, errors?: FormattedError[]) {
    const errorMessage = field ? `${field}: ${message}` : message;
    return new ValidationError(errorMessage, errors);
  }
  
  static notFound(resource: string, identifier?: string | number) {
    const message = identifier 
      ? `${resource} with ID ${identifier} not found`
      : `${resource} not found`;
    return new NotFoundError(message);
  }
  
  static unauthorized(message?: string) {
    return new UnauthorizedError(message || 'Unauthorized access');
  }
  
  static forbidden(message?: string) {
    return new ForbiddenError(message || 'Access forbidden');
  }
  
  static database(operation: string, details?: string) {
    const message = details 
      ? `Database ${operation} failed: ${details}`
      : `Database ${operation} failed`;
    return new DatabaseError(message);
  }
  
  static conflict(message?: string) {
    return new ConflictError(message || 'Resource conflict');
  }
  
  static custom(message: string, statusCode: number, errorCode?: string, details?: any) {
    return new AppError(message, statusCode, errorCode, details);
  }
}