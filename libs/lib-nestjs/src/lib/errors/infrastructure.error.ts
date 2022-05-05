export class InfrastructureError extends Error {
  originalError?: Error;

  constructor(originalError?: Error) {
    super('Infrastructure error');
    this.originalError = originalError;
  }
}
