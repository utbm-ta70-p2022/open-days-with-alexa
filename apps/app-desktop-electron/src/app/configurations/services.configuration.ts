import { FilesystemService, SettingsService } from '@libraries/lib-electron';

import { IManageFilesystem, IManageSettings } from '@libraries/lib-electron';
import { Container } from 'inversify';
import { TYPES } from '@libraries/lib-electron';

export class ServicesConfiguration {
  public static generate(): Container {
    const container = new Container();

    container.bind<IManageFilesystem>(TYPES.IManageFilesystem).to(FilesystemService).inTransientScope();

    container.bind<IManageSettings>(TYPES.IManageSettings).to(SettingsService).inTransientScope();

    return container;
  }
}
