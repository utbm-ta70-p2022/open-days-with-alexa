import { app, dialog, ipcMain } from 'electron';
import { IpcChannels } from '@libraries/lib-common';
import { environment } from '../../environments/environment';
import { IpcResponseModel, SettingsModel } from '@libraries/lib-common';
import App from '../app';
import { SettingsService } from '@libraries/lib-electron';
import { TYPES } from '@libraries/lib-electron';
import { AppBackgroundtask } from '../backgroundtasks/app.backgroundtask';

export class CommonIpc {
  static bootstrap(): Electron.IpcMain {
    return ipcMain;
  }
}

ipcMain.on(IpcChannels.common.GET_APP_VERSION, (event) => {
  const ipcResponse: IpcResponseModel<string> = { data: environment.version };

  event.sender.send(IpcChannels.common.GET_APP_VERSION, ipcResponse);
});

ipcMain.on(IpcChannels.common.GET_APP_SETTINGS, async (event) => {
  const settingsService = App.services.get<SettingsService>(TYPES.IManageSettings);

  const ipcResponse = new IpcResponseModel<SettingsModel>();

  try {
    ipcResponse.data = await settingsService.retrieveSettings();
  } catch (error) {
    ipcResponse.errorMessage = error.message;
  }

  event.sender.send(IpcChannels.common.GET_APP_SETTINGS, ipcResponse);
});

ipcMain.on(IpcChannels.common.SAVE_APP_SETTINGS, async (event, settings: SettingsModel) => {
  const settingsService = App.services.get<SettingsService>(TYPES.IManageSettings);

  const ipcResponse = new IpcResponseModel<void>();

  try {
    await settingsService.saveSettings(settings);
  } catch (error) {
    ipcResponse.errorMessage = error.message;
  }

  await AppBackgroundtask.getInstance().initialize();

  event.sender.send(IpcChannels.common.SAVE_APP_SETTINGS, ipcResponse);
});

ipcMain.on(IpcChannels.common.RESET_SETTINGS, async (event) => {
  const settingsService = App.services.get<SettingsService>(TYPES.IManageSettings);

  const ipcResponse = new IpcResponseModel<void>();

  try {
    await settingsService.resetSettings();
  } catch (error) {
    ipcResponse.errorMessage = error.message;
  }
  console.log(App);

  await AppBackgroundtask.getInstance().initialize();

  event.sender.send(IpcChannels.common.RESET_SETTINGS, ipcResponse);
});

ipcMain.on(IpcChannels.common.GET_PLATFORM, (event) => {
  const ipcResponse: IpcResponseModel<string> = { data: process.platform.toString() };
  event.sender.send(IpcChannels.common.GET_PLATFORM, ipcResponse);
});

ipcMain.on(IpcChannels.common.EXIT, (_event, code) => {
  app.exit(code);
});

ipcMain.on(IpcChannels.common.ASK_CONFIRMATION_BY_DIALOG, async (event, message: string) => {
  const ipcResponse = new IpcResponseModel<boolean>();

  try {
    ipcResponse.data =
      (
        await dialog.showMessageBox({
          title: 'Confirmation',
          message: message,
          buttons: ['No', 'Yes'],
        })
      ).response === 1;
  } catch (error) {
    ipcResponse.data = error.message;
  }

  event.sender.send(IpcChannels.common.ASK_CONFIRMATION_BY_DIALOG, ipcResponse);
});
