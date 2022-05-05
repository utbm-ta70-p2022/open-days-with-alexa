export class ApiError extends Error {
  originalError?: Error;

  constructor(originalError?: Error) {
    super('Api error');
    this.originalError = originalError;
  }
}
