export class InfrastructureError extends Error {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
