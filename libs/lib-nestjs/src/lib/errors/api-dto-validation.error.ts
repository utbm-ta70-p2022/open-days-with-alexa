import { ApiError } from './api.error';

export class ApiDtoValidationError extends ApiError {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
