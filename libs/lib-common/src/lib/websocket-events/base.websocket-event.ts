import { WebsocketEventType } from '../enumerations/websocket-event-type.enumeration';

export class BaseWebsocketEvent {
  type: WebsocketEventType;

  constructor(type: WebsocketEventType) {
    this.type = type;
  }
}
