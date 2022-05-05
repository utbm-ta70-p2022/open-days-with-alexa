import { apiGateways } from '@libraries/lib-common';
import { WebsocketGateway } from '@libraries/lib-nestjs';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server } from 'socket.io';

@WebsocketGateway()
export class PresentationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(apiGateways.events)
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: apiGateways.events, data: item })));
  }

  @SubscribeMessage(apiGateways.identity)
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
