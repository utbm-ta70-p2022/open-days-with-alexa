import { ApiError } from './api.error';

export class ApiDtoValidationError extends ApiError {
  constructor(originalError?: Error) {
    super(originalError);
  }
}
