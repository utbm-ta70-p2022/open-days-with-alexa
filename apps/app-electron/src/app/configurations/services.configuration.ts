import { FilesystemService, SettingsService } from '@libraries/core/services';

import { IManageFilesystem, IManageSettings } from '@libraries/core/interfaces';
import { Container } from 'inversify';
import { TYPES } from '@libraries/core/constants';

export class ServicesConfiguration {
  public static generate(): Container {
    const container = new Container();

    container.bind<IManageFilesystem>(TYPES.IManageFilesystem).to(FilesystemService).inTransientScope();

    container.bind<IManageSettings>(TYPES.IManageSettings).to(SettingsService).inTransientScope();

    return container;
  }
}
