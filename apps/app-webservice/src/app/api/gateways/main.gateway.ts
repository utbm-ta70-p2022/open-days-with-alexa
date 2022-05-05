import { apiGateways, BaseWebsocketEvent, TestWebsocketEvent, WebsocketEventType } from '@libraries/lib-common';
import { WebsocketGateway } from '@libraries/lib-nestjs';
import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebsocketGateway()
export class MainGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(apiGateways.events)
  async subscribeToEvents(@MessageBody() event: BaseWebsocketEvent): Promise<WsResponse<BaseWebsocketEvent>> {
    return await this.handleEvents(event);
  }

  async handleEvents(event: BaseWebsocketEvent): Promise<WsResponse<BaseWebsocketEvent>> {
    let data: BaseWebsocketEvent;

    switch (event.type) {
      case WebsocketEventType.Test:
        data = { type: WebsocketEventType.Test, message: 'Hello from the server 👋' } as TestWebsocketEvent;
        Logger.log((event as TestWebsocketEvent).message);
    }

    return {
      data: data,
      event: apiGateways.events,
    };
  }
}
