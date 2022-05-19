import { ApplicationError } from "./application.error";

export class InformationNotFoundError extends ApplicationError {
  constructor() {
    super('Information non trouvée');
  }
}
