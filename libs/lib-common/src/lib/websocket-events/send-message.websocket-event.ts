import { WebsocketEventType } from '../enumerations/websocket-event-type.enumeration';
import { BaseWebsocketEvent } from './base.websocket-event';

export class SendMessageWebsocketEvent extends BaseWebsocketEvent {
  message: string;

  constructor() {
    super(WebsocketEventType.SendMessage);
  }
}
