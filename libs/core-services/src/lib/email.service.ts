import { IManageEmail } from '@libraries/core/interfaces';
import { injectable } from 'inversify';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EmailTemplate } from '@libraries/ipc/enumerations';
import { compile } from 'handlebars';
import { createTransport } from 'nodemailer';

@injectable()
export class EmailService implements IManageEmail {
  async send(from: string, to: string[], subject: string, template: EmailTemplate, data?: unknown): Promise<void> {
    const transporter = createTransport({ host: '', port: 25, ignoreTLS: true });
    transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: compile(readFileSync(join(__dirname, 'assets', 'email-templates', `${template}.hbs`), 'utf8'))(data),
    });
  }
}
