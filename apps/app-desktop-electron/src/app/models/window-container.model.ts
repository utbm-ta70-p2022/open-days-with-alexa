import { BaseWindow } from '../windows/base.window';

export class WindowContainerModel {
  private readonly _id: number;

  private readonly _windowTypeName: string;

  private readonly _window: BaseWindow;

  constructor(id: number, windowTypeName: string, window: BaseWindow) {
    this._id = id;
    this._windowTypeName = windowTypeName;
    this._window = window;
  }

  get id(): number {
    return this._id;
  }

  get windowTypeName(): string {
    return this._windowTypeName;
  }

  get window(): BaseWindow {
    return this._window;
  }
}
