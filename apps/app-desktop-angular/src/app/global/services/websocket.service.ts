import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { ToastMessageService } from './toast-message.service';
import { apiGateways } from '@libraries/lib-common';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private _socket: Socket;

  constructor(private readonly _toastMessageService: ToastMessageService) {}

  initialize() {
    this._socket = io(environment.webserviceOrigin);
    const socket = this._socket;
    const toastMessageService = this._toastMessageService;

    socket.on(apiGateways.connect, () => {
      toastMessageService.showSuccess('Connected');

      socket.emit(apiGateways.events, { test: 'test' });

      socket.emit(apiGateways.identity, 0, (response: any) => {
        toastMessageService.showInfo(`Identity: ${response}`);
      });
    });

    socket.on(apiGateways.events, (data) => {
      toastMessageService.showInfo(`event: ${data}`);
    });

    socket.on(apiGateways.exception, (data) => {
      toastMessageService.showInfo(`event: ${data}`);
    });

    socket.on(apiGateways.disconnect, () => {
      toastMessageService.showInfo('Disconnected');
    });
  }
}
