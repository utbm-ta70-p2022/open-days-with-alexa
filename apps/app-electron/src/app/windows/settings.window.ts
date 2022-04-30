import { AppRoute } from '@libraries/ipc/enumerations';
import { BaseWindow } from './base.window';

export class SettingsWindow extends BaseWindow {
  constructor() {
    super(AppRoute.Settings, { title: 'Settings', frame: true, resizable: true });
  }
}
