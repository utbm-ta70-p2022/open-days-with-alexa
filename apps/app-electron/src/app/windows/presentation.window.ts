import { AppRoute } from '@libraries/lib-common';
import { BaseWindow } from './base.window';

export class PresentationWindow extends BaseWindow {
  constructor() {
    super(AppRoute.Presentation, { title: 'Presentation', frame: true, resizable: true });
  }
}
