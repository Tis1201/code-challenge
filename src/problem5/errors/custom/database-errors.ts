
import { AppError } from "../base/app-error";

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

// Có thể thêm các lỗi database cụ thể sau này
export class UniqueConstraintError extends DatabaseError {
  constructor(field: string) {
    super(`Field ${field} must be unique`);
  }
}