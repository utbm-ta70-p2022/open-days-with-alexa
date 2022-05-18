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

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _socket: Socket;

  constructor(
    private readonly _toastMessageService: ToastMessageService,
    private readonly _presentationService: PresentationService
  ) {}

  async connect(): Promise<void> {
    if (this._socket) {
      return;
    }

    this._socket = io(environment.webserviceOrigin);

    this._socket.on(apiGateways.exception, (error: ApiError) => {
      this._toastMessageService.showError(error.message);
    });

    this._socket.on(apiGateways.disconnect, () => {
      this._toastMessageService.showError('Serveur Open days with Alexa déconnecté', 'Déconnecté');
    });

    this._socket.on(apiGateways.events, (event: BaseWebsocketEvent) => {
      this.handleEvent(event);
    });

    await new Promise<void>((resolve) => {
      this._socket.on(apiGateways.connect, () => {
        this._toastMessageService.showSuccess('Serveur Open days with Alexa connecté', 'Connecté');
        resolve;
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
        this._presentationService.present((event as PresentInformationWebsocketEvent).informationId);
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
