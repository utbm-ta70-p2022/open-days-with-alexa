import { EmailTemplate } from '@libraries/lib-common';

export interface IManageEmail {
  send(from: string, to: string[], subject: string, template: EmailTemplate, data?: any): Promise<void>;
}
