import { appRoutes } from '@libraries/lib-common';
import { BaseWindow } from './base.window';

export class MainWindow extends BaseWindow {
  constructor() {
    super(appRoutes.presentation.root, { title: 'Open days with Alexa', frame: true, resizable: true });
  }
}
