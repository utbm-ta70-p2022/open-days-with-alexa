import * as winston from 'winston';
import { File } from 'winston/lib/winston/transports';
import { join } from 'path';

export class FileTransport extends File {
  constructor(directory: string, filePrefix?: string) {
    super({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `[${info.timestamp} ${info.level.toUpperCase()}] ${info.message}`)
      ),
      filename: join(
        directory,
        `${filePrefix}${filePrefix ? '-' : ''}${new Date().getUTCFullYear()}-${
          new Date().getUTCMonth() + 1
        }-${new Date().getUTCDate()}.log`
      ),
    });
  }
}
