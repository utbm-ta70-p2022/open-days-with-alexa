import { SettingsModel } from '@libraries/lib-common';

export interface IManageSettings {
  retrieveSettings(): SettingsModel;
  saveSettings(userSettings: SettingsModel): void;
  resetSettings(): void;
}
