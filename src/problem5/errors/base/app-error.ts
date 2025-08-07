export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode?: string,
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
