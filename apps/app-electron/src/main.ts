import SquirrelEvents from './app/events/squirrel.events';
import UpdateEvents from './app/events/update.events';
import { app } from 'electron';
import App from './app/app';
import { CommonIpc } from './app/ipc/common.ipc';
import { AppHelper } from './app/helpers/app.helper';

if (SquirrelEvents.handleEvents()) {
  app.quit();
}

App.launch(app);

CommonIpc.bootstrap();

if (!AppHelper.isDevelopmentMode()) {
  UpdateEvents.initAutoUpdateService();
}
