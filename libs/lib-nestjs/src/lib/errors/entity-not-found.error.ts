import { DomainError } from './domain.error';

export class EntityNotFoundError extends DomainError {
  private type: string;

  constructor(information: { originalError?: Error; type: string }) {
    super();
    this.originalError = information.originalError;
    this.type = information.type;
  }
}
