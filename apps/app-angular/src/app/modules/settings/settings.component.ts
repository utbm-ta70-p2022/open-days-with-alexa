import { Component, OnInit } from '@angular/core';
import { IpcChannels } from '@libraries/lib-common';
import { SettingsModel } from '@libraries/lib-common';
import { IpcService } from '../../global/services/ipc.service';
import { ToastMessageService } from '../../global/services/toast-message.service';

@Component({
  selector: 'app-angular-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settings: SettingsModel;

  constructor(private readonly _ipcService: IpcService, private readonly _toastMessageService: ToastMessageService) {}

  async ngOnInit() {
    try {
      this.settings = await this._ipcService.query<SettingsModel>(IpcChannels.common.GET_APP_SETTINGS);
    } catch (error: any) {
      this._toastMessageService.showError(error);
    }
  }

  async save() {
    try {
      await this._ipcService.query(IpcChannels.common.SAVE_APP_SETTINGS, this.settings);
      this._toastMessageService.showSuccess('Saved');
    } catch (error: any) {
      this._toastMessageService.showError(error);
    }
  }

  async reset() {
    try {
      await this._ipcService.query(IpcChannels.common.RESET_SETTINGS, this.settings);
    } catch (error: any) {
      this._toastMessageService.showError(error);
    }

    try {
      this.settings = await this._ipcService.query<SettingsModel>(IpcChannels.common.GET_APP_SETTINGS);
      this._toastMessageService.showSuccess('Settings reset');
    } catch (error: any) {
      this._toastMessageService.showError(error);
    }
  }
}
