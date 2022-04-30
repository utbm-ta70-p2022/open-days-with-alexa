import { homedir } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { IManageSettings } from '@libraries/core/interfaces';
import { injectable } from 'inversify';
import { SettingsModel } from '@libraries/ipc/models';
import { FilesystemHelper } from '@libraries/core/helpers';
import { DEFAULT_SETTINGS } from '@libraries/ipc/constants';

@injectable()
export class SettingsService implements IManageSettings {
  private readonly _settingsFileName = 'settings.json';

  private readonly _settingsDirectory = '.app-angular';

  public retrieveSettings(): SettingsModel {
    const settingsPath = join(homedir(), this._settingsDirectory, this._settingsFileName);

    let settings: SettingsModel;
    try {
      settings = JSON.parse(readFileSync(settingsPath).toString());
    } catch {
      settings = DEFAULT_SETTINGS;
    }

    return settings;
  }

  public saveSettings(userSettings: SettingsModel): void {
    const settingsPath = join(homedir(), this._settingsDirectory, this._settingsFileName);

    FilesystemHelper.createFileIfNotExists(settingsPath);

    writeFileSync(settingsPath, JSON.stringify(userSettings));
  }

  public resetSettings(): void {
    const settingsPath = join(homedir(), this._settingsDirectory, this._settingsFileName);

    FilesystemHelper.createFileIfNotExists(settingsPath);

    writeFileSync(settingsPath, JSON.stringify(DEFAULT_SETTINGS));
  }
}
