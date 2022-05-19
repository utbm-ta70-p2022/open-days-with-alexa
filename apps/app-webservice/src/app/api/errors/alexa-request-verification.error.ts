import { ApiError } from '@libraries/lib-nestjs';

export class AlexaRequestVerificationError extends ApiError {
  constructor(originalError: Error) {
    super(originalError);
  }
}
