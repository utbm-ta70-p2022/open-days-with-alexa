import { appRoutes } from '@libraries/lib-common';
import { BaseWindow } from './base.window';

export class StartupWindow extends BaseWindow {
  constructor() {
    super(appRoutes.startup.root, { title: 'Startup', width: 350, height: 200, frame: false, resizable: false });
  }
}
