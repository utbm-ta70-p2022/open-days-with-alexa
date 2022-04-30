import { IManageLogging } from '@libraries/core/interfaces';
import { injectable } from 'inversify';
import { transport, createLogger, Logger } from 'winston';

@injectable()
export class LoggerService implements IManageLogging {
  private _logger: Logger;

  public configure(transports: transport[] = []): void {
    this._logger = createLogger({
      transports: transports,
    });
  }

  public logDebug(message: string, ...meta: any[]): void {
    this._logger.log('debug', message, ...meta);
  }

  public logInfo(message: string, ...meta: any[]): void {
    this._logger.log('info', message, ...meta);
  }

  public logWarn(message: string, ...meta: any[]): void {
    this._logger.log('warn', message, ...meta);
  }

  public logError(message: string, ...meta: any[]): void {
    this._logger.log('error', message, ...meta);
  }
}
