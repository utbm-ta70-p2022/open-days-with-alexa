import { WindowContainerModel } from './models/window-container.model';
import { Container } from 'inversify';
import { StartupWindow } from './windows/startup.window';
import { ServicesConfiguration } from './configurations/services.configuration';
import { MainTray } from './trays/main.tray';
import { TimeoutHelper } from './helpers/timeout.helper';
import { BaseWindow } from './windows/base.window';
import { Connection } from 'typeorm';
import { AppDatabaseConnectionConfiguration } from './configurations/app-database-connection.configuration';
import { AppBackgroundtask } from './backgroundtasks/app.backgroundtask';
import { SettingsWindow } from './windows/settings.window';

export default class App {
  static windowContainers: WindowContainerModel[] = [];
  static application: Electron.App;
  static services: Container;
  static monitoringToolDatabaseConnection: Connection;

  static appBackgroundtask: AppBackgroundtask;

  static tray: MainTray;

  public static launch(app: Electron.App) {
    App.application = app;

    if (!App.application.requestSingleInstanceLock()) {
      App.application.quit();
      return;
    }

    App.application.on('ready', App.initialize);
    App.application.on('window-all-closed', (event) => event.preventDefault());
  }

  private static async initialize() {
    App.services = ServicesConfiguration.generate();
    App.monitoringToolDatabaseConnection = await AppDatabaseConnectionConfiguration.generate();

    App.appBackgroundtask = await AppBackgroundtask.getInstance().initialize();

    App.tray = new MainTray();

    App.loadWindow(StartupWindow);
    await TimeoutHelper.wait(3000);
    App.unloadAllWindows(StartupWindow);
    App.loadWindow(SettingsWindow);
  }

  public static loadWindow(windowType: new () => BaseWindow, loadNewWindow = false) {
    if (!loadNewWindow && App.windowContainers.some((container) => container.windowTypeName === windowType.name)) {
      for (const windowItem of App.windowContainers.filter(
        (container) => container.windowTypeName == windowType.name
      )) {
        windowItem.window.show();
      }
      return;
    }

    const newWindow = new windowType();
    this.windowContainers.push(new WindowContainerModel(newWindow.id, windowType.name, newWindow));
  }

  public static unloadAllWindows(windowType: new () => BaseWindow) {
    const matchingContainerIndices = App.windowContainers
      .map((container, index) => (container.windowTypeName === windowType.name ? index : -1))
      .filter((index) => index !== -1)
      .sort((a, b) => b - a);

    for (const index of matchingContainerIndices) {
      App.windowContainers[index].window.destroy();
      App.windowContainers.splice(index, 1);
    }
  }

  public static unload(windowId: number) {
    const matchingContainerIndices = App.windowContainers
      .map((container, index) => (container.id === windowId ? index : -1))
      .filter((index) => index !== -1)
      .sort((a, b) => b - a);

    for (const index of matchingContainerIndices) {
      App.windowContainers[index].window.destroy();
      App.windowContainers.splice(index, 1);
    }
  }
}
