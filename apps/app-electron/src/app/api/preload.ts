import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  on: (channel: string, listener: any) => ipcRenderer.on(channel, listener),
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  removeListener: (channel: string, listener: any) => ipcRenderer.removeListener(channel, listener),
});
