import { ApplicationError } from './application.error';

export class InformationNotHandledError extends ApplicationError {
  constructor() {
    super('Information non prise en charge');
  }
}
