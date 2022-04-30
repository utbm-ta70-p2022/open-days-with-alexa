import { IpcChannels } from '@libraries/ipc/constants';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import App from '../app';

export class IpcTransport extends Transport {
  private readonly _windowIds: number[];

  constructor(windowIds: number[]) {
    super({
      format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
    });

    this._windowIds = windowIds;
  }

  log(info: any, next: () => void) {
    for (const container of App.windowContainers.filter((container) => this._windowIds.includes(container.id))) {
      try {
        container.window.webContents.send(IpcChannels.common.LOG, info);
        // eslint-disable-next-line no-empty
      } catch {}
    }

    next();
  }
}
