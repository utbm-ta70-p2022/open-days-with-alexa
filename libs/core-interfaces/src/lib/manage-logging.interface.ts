import * as winston from 'winston';

export interface IManageLogging {
  configure(transports: winston.transport[]): void;
  logDebug(message: string, ...meta: any[]): void;
  logInfo(message: string, ...meta: any[]): void;
  logWarn(message: string, ...meta: any[]): void;
  logError(message: string, ...meta: any[]): void;
}
