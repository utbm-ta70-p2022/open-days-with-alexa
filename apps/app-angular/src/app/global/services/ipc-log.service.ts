import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service';
import { IpcChannels } from '@libraries/lib-common';
import { LogModel } from '@libraries/lib-common';

@Injectable({
  providedIn: 'root',
})
export class IpcLogService {
  private _actionEnabled = false;

  private _action: (log: LogModel) => void;

  constructor(private readonly _ipcService: IpcService) {}

  listen() {
    this._ipcService.listen<LogModel>(IpcChannels.common.LOG, (log: LogModel) => {
      if (this._actionEnabled) {
        this._action(log);
      }
    });
  }

  enableAction(action: (log: LogModel) => void) {
    this._action = action;
    this._actionEnabled = true;
  }

  disableAction() {
    this._actionEnabled = false;
  }
}
