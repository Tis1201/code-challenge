export interface FormattedFieldError {
  field: string;
  message: string;
  value?: any;
  location?: "body" | "query" | "params" | "headers" | "cookies";
}

export interface FormattedNonFieldError {
  message: string;
  type?: "alternative" | "alternative_grouped" | "unknown_fields" | string;
}

export type FormattedError = FormattedFieldError | FormattedNonFieldError;

export interface IErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    errorCode?: string | undefined;
    stack?: string | undefined;
    timestamp: string;
    path: string;
    details?: any;
  };
}

export interface IErrorHandler {
  canHandle(error: Error): boolean;
  handle(error: Error): {
    statusCode: number;
    message: string;
    errorCode?: string;
    details?: any;
  };
}
