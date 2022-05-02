export class DomainError extends Error {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
