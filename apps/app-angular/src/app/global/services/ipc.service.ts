import { IpcRenderer } from 'electron';
import { Injectable } from '@angular/core';
import { IpcResponseModel } from '@libraries/ipc/models';

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  private _ipcRenderer: IpcRenderer;

  constructor() {
    this._ipcRenderer = (window as any)?.electron;
    if (!this._ipcRenderer) {
      console.warn('IpcRenderer has not been loaded');
    }
  }

  public async query<T>(channel: string, ...parameters: any[]): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      const listener = (_event: any, ipcResponse: IpcResponseModel<T>) => {
        if (ipcResponse.errorMessage) {
          reject(new Error(ipcResponse.errorMessage));
        } else {
          resolve(ipcResponse.data as T);
        }
        this._ipcRenderer.removeListener(channel, listener);
      };

      this._ipcRenderer.on(channel, listener);
      this._ipcRenderer.send(channel, ...parameters);
    });
  }

  public subscribe<P, E>(
    channel: string,
    progressAction: (data: P) => void,
    endAction: (data: E) => void,
    ...parameters: any[]
  ) {
    const listener = (_event: any, stop: boolean, data: P | E) => {
      if (stop) {
        this._ipcRenderer.removeListener(channel, listener);
        endAction(data as E);
        return;
      }
      progressAction(data as P);
    };
    this._ipcRenderer.on(channel, listener);
    this._ipcRenderer.send(channel, ...parameters);
  }

  public listen<T>(channel: string, receive: (data: T) => void) {
    const listener = (_event: any, data: T) => {
      receive(data as T);
    };
    this._ipcRenderer.on(channel, listener);
    this._ipcRenderer.send(channel);
  }
}
