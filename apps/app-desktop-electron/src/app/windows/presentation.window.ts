import { appRoutes } from '@libraries/lib-common';
import { BaseWindow } from './base.window';

export class PresentationWindow extends BaseWindow {
  constructor() {
    super(appRoutes.presentation.root, { title: 'Presentation', frame: true, resizable: true });
  }
}
