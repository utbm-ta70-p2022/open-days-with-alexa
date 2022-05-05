export class DomainError extends Error {
  originalError?: Error;

  constructor(originalError?: Error) {
    super('Domain error');
    this.originalError = originalError;
  }
}
