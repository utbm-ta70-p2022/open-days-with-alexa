import { appRoutes } from '@libraries/lib-common';
import { BaseWindow } from './base.window';

export class SettingsWindow extends BaseWindow {
  constructor() {
    super(appRoutes.settings.root, { title: 'Settings', frame: true, resizable: true });
  }
}
