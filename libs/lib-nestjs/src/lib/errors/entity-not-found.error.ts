import { DomainError } from './domain.error';

export class EntityNotFoundError extends DomainError {
  private type: string;

  constructor(information: { originalErrorMessage?: string; type?: string } = {}) {
    super(information.originalErrorMessage);
    this.type = information.type;
  }
}
