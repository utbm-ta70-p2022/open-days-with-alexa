export class ApiError extends Error {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
