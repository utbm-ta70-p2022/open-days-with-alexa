import { SettingsModel } from '@libraries/ipc/models';

export interface IManageSettings {
  retrieveSettings(): SettingsModel;
  saveSettings(userSettings: SettingsModel): void;
  resetSettings(): void;
}
