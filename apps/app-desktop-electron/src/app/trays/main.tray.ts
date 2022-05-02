import { Menu, nativeImage, Tray } from 'electron';
import { join } from 'path';
import { environment } from '../../environments/environment';
import App from '../app';
import { SettingsWindow } from '../windows/settings.window';

export class MainTray extends Tray {
  constructor() {
    super(nativeImage.createFromPath(join(__dirname, 'assets', 'images', `icon.ico`)));
    this.setToolTip(`Open days with Alexa ${environment.version}`);
    this.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Settings',
          click: () => App.loadWindow(SettingsWindow),
        },
        {
          label: 'Exit application',
          click: () => App.application.exit(),
        },
      ])
    );
  }
}
