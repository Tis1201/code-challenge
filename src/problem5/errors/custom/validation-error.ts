// validation-errors.ts
import { FormattedError } from "../../interfaces/error.interface";
import { AppError } from "../base/app-error";

export class ValidationError extends AppError {
  constructor(message: string, public errors?: FormattedError[]) { 
    super(message, 400, 'VALIDATION_ERROR', errors);
    this.name = 'ValidationError';
  }
}