import { IErrorHandler } from "../../interfaces/error.interface";
import { AppErrorHandler } from "../handlers/app-error-handler";
import { DefaultErrorHandler } from "../handlers/default-error-handler";
import { JWTErrorHandler } from "../handlers/jwt-error-handler";
import { PrismaConnectionErrorHandler } from "../handlers/prisma-connection-error-handler";
import { PrismaValidationErrorHandler } from "../handlers/prisma-error-handler";
import { PrismaKnownErrorHandler } from "../handlers/prisma-known-error-handler";
import { PrismaUnknownErrorHandler } from "../handlers/prisma-unknown-error-handler";
import { ValidationErrorHandler } from "../handlers/validation-error-handler";

export class ErrorHandlerFactory {
  private static handlers: IErrorHandler[] = [
    new ValidationErrorHandler(),
    new AppErrorHandler(),
    new PrismaValidationErrorHandler(),
    new PrismaKnownErrorHandler(),
    new PrismaUnknownErrorHandler(),
    new PrismaConnectionErrorHandler(),
    new JWTErrorHandler(),
    new DefaultErrorHandler() // Must be last as fallback
  ];

  static getHandler(error: Error): IErrorHandler {
    const handler = this.handlers.find(h => h.canHandle(error));
    return handler || new DefaultErrorHandler();
  }

  static addHandler(handler: IErrorHandler): void {
    // Insert before default handler (which should always be last)
    this.handlers.splice(-1, 0, handler);
  }

  static removeHandler(handlerType: new() => IErrorHandler): void {
    this.handlers = this.handlers.filter(h => !(h instanceof handlerType));
  }

  // Utility method to get all registered handlers
  static getRegisteredHandlers(): string[] {
    return this.handlers.map(h => h.constructor.name);
  }

  // Method to reset handlers to default (Prisma + MySQL focused)
  static resetHandlers(): void {
    this.handlers = [
      new ValidationErrorHandler(),
      new AppErrorHandler(),
      new PrismaValidationErrorHandler(),
      new PrismaKnownErrorHandler(),
      new PrismaUnknownErrorHandler(),
      new PrismaConnectionErrorHandler(),
      new JWTErrorHandler(),
      new DefaultErrorHandler()
    ];
  }
}