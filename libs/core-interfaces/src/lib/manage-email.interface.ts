import { EmailTemplate } from '@libraries/ipc/enumerations';

export interface IManageEmail {
  send(from: string, to: string[], subject: string, template: EmailTemplate, data?: any): Promise<void>;
}
