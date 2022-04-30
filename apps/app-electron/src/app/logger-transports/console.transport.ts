import * as winston from 'winston';
import { Console } from 'winston/lib/winston/transports';

export class ConsoleTransport extends Console {
  constructor() {
    super({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `[${info.timestamp} ${info.level.toUpperCase()}] ${info.message}`),
        winston.format.colorize({ all: true })
      ),
    });
  }
}
