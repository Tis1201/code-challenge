import { IErrorHandler } from "../../interfaces/error.interface";

export class PrismaKnownErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error.name === 'PrismaClientKnownRequestError';
  }

  handle(error: Error) {
    const prismaError = error as any;
    const errorCode = prismaError.code;
    
    switch (errorCode) {
      case 'P2002': // Unique constraint violation
        return {
          statusCode: 409,
          message: 'Duplicate field value',
          errorCode: 'DUPLICATE_KEY_ERROR',
          details: {
            target: prismaError.meta?.target,
            modelName: prismaError.meta?.modelName
          }
        };
        
      case 'P2003': // Foreign key constraint violation
        return {
          statusCode: 400,
          message: 'Foreign key constraint violation',
          errorCode: 'FOREIGN_KEY_ERROR',
          details: {
            field: prismaError.meta?.field_name,
            modelName: prismaError.meta?.modelName
          }
        };
        
      case 'P2004': // Constraint failed
        return {
          statusCode: 400,
          message: 'Database constraint violation',
          errorCode: 'CONSTRAINT_ERROR',
          details: {
            constraint: prismaError.meta?.constraint,
            modelName: prismaError.meta?.modelName
          }
        };
        
      case 'P2025': // Record not found
        return {
          statusCode: 404,
          message: 'Record not found',
          errorCode: 'RECORD_NOT_FOUND',
          details: {
            cause: prismaError.meta?.cause,
            modelName: prismaError.meta?.modelName
          }
        };
        
      case 'P2011': // Null constraint violation
        return {
          statusCode: 400,
          message: 'Required field is missing',
          errorCode: 'NULL_CONSTRAINT_ERROR',
          details: {
            constraint: prismaError.meta?.constraint,
            modelName: prismaError.meta?.modelName
          }
        };
        
      case 'P2012': // Missing required value
        return {
          statusCode: 400,
          message: 'Missing required field',
          errorCode: 'MISSING_REQUIRED_VALUE',
          details: {
            path: prismaError.meta?.path,
            modelName: prismaError.meta?.modelName
          }
        };
        
      case 'P2014': // Required relation missing
        return {
          statusCode: 400,
          message: 'Required relation is missing',
          errorCode: 'REQUIRED_RELATION_ERROR',
          details: {
            relation: prismaError.meta?.relation_name,
            modelName: prismaError.meta?.model_a_name
          }
        };
        
      default:
        return {
          statusCode: 500,
          message: 'Database operation failed',
          errorCode: 'PRISMA_KNOWN_ERROR',
          details: {
            code: errorCode,
            meta: prismaError.meta
          }
        };
    }
  }
}