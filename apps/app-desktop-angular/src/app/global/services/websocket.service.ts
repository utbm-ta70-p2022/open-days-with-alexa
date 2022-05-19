import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { ToastMessageService } from './toast-message.service';
import {
  apiGateways,
  BaseWebsocketEvent,
  PresentInformationWebsocketEvent,
  SendMessageWebsocketEvent,
  TestWebsocketEvent,
  WebsocketEventType,
} from '@libraries/lib-common';
import { ApiError } from '@libraries/lib-nestjs';
import { PresentationService } from './presentation.service';
import { lastValueFrom } from 'rxjs';
import { Store } from '@ngxs/store';
import { Refresh } from '../store/actions/current-presentation.actions';
import { Update } from '../store/actions/server-status.actions';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _socket: Socket;

  constructor(
    private readonly _toastMessageService: ToastMessageService,
    private readonly _presentationService: PresentationService,
    private readonly _store: Store
  ) {}

  async connect(): Promise<void> {
    if (this._socket) {
      return;
    }

    this._socket = io(environment.webserviceOrigin);

    this._socket.on(apiGateways.exception, (error: ApiError) => {
      this._toastMessageService.showError(error.message);
    });

    this._socket.on(apiGateways.disconnect, async () => {
      this._toastMessageService.showError('Serveur Open days with Alexa déconnecté', 'Serveur déconnecté');
      await lastValueFrom(this._store.dispatch(new Update(false)));
    });

    this._socket.on(apiGateways.events, (event: BaseWebsocketEvent) => {
      this.handleEvent(event);
    });

    await new Promise<void>((resolve) => {
      this._socket.on(apiGateways.connect, async () => {
        this._toastMessageService.showSuccess('Serveur Open days with Alexa connecté', 'Serveur connecté');
        await lastValueFrom(this._store.dispatch(new Update(true)));
        resolve();
      });
    });
  }

  async handleEvent(event: BaseWebsocketEvent) {
    switch (event.type) {
      case WebsocketEventType.Test:
        this._toastMessageService.showSuccess((event as TestWebsocketEvent).message);
        break;
      case WebsocketEventType.SendMessage:
        this._toastMessageService.showInfo((event as SendMessageWebsocketEvent).message);
        break;
      case WebsocketEventType.PresentInformation:
        await lastValueFrom(
          this._store.dispatch(new Refresh((event as PresentInformationWebsocketEvent).informationId))
        );
        break;
    }
  }

  async test() {
    this._socket.emit(apiGateways.events, {
      type: WebsocketEventType.Test,
      message: 'Hello from the desktop app 👋',
    } as TestWebsocketEvent);
  }
}
