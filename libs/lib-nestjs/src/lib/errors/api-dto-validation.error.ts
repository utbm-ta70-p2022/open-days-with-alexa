import { ApiError } from './api.error';

export class ApiDtoValidationError extends ApiError {
  originalError?: Error;
  
  constructor(originalError?: Error) {
    super();
  }
}
