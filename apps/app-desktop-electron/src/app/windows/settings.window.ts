import { AppRoute } from '@libraries/lib-common';
import { BaseWindow } from './base.window';

export class SettingsWindow extends BaseWindow {
  constructor() {
    super(AppRoute.Settings, { title: 'Settings', frame: true, resizable: true });
  }
}
