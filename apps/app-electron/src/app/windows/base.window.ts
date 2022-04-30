import { AppRoute } from '@libraries/ipc/enumerations';
import { BrowserWindow, dialog, Menu, MenuItem, nativeImage, screen, shell } from 'electron';
import { join } from 'path';
import App from '../app';
import { rendererAppName, rendererAppPort } from '../constants/app.constant';
import { AppHelper } from '../helpers/app.helper';

export class BaseWindow extends BrowserWindow {
  route: string;

  constructor(
    route: AppRoute,
    options: {
      title?: string;
      width?: number;
      height?: number;
      frame?: boolean;
      resizable?: boolean;
      confirmClose?: boolean;
    }
  ) {
    super({
      width: options.width ?? Math.min(1280, screen.getPrimaryDisplay().workAreaSize.width || 1280),
      height: options.height ?? Math.min(720, screen.getPrimaryDisplay().workAreaSize.height || 720),
      show: false,
      frame: !!options.frame,
      resizable: AppHelper.isDevelopmentMode() ? true : !!options?.resizable,
      webPreferences: {
        contextIsolation: true,
        backgroundThrottling: false,
        preload: join(__dirname, `preload.js`),
      },
      title: options.title ?? '',
      icon: nativeImage.createFromPath(join(__dirname, 'assets', 'images', `icon.ico`)),
      center: true,
    });

    this.route = route;

    const menu = new Menu();
    if (AppHelper.isDevelopmentMode()) {
      menu.append(
        new MenuItem({
          label: 'Development',
          submenu: [
            {
              role: 'toggleDevTools',
              accelerator: process.platform === 'darwin' ? 'Ctrl+Cmd+I' : 'Ctrl+Shift+I',
            },
            {
              role: 'reload',
              accelerator: 'Ctrl+F5',
            },
            {
              label: 'Trigger Test Function',
              click: async (_menuItem, browserWindow) => {
                await dialog.showMessageBox(browserWindow, {
                  title: 'Development',
                  message: 'Test function triggered !',
                });
              },
            },
          ],
        })
      );
    }
    this.setMenu(menu);

    this.once('ready-to-show', () => this.show());

    this.webContents.on('will-navigate', (event, url) => {
      if (url !== this.webContents.getURL()) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });

    this.webContents.on('new-window', (event, url) => {
      if (url !== this.webContents.getURL()) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });

    this.on('close', async (event) => {
      event.preventDefault();
      if (options?.confirmClose) {
        if (
          (
            await dialog.showMessageBox({
              title: 'Confirmation',
              message: 'Are you sure you want to close the window ?',
              buttons: ['No', 'Yes'],
            })
          ).response === 1
        ) {
          App.unload(this.id);
        }
      } else {
        App.unload(this.id);
      }
    });

    if (!App.application.isPackaged) {
      this.loadURL(`http://localhost:${rendererAppPort}#/${route}`);
    } else {
      this.loadURL(`file://${join(__dirname, '..', rendererAppName, 'index.html')}#/${route}`);
    }
  }
}
