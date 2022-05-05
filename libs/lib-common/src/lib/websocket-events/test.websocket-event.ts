import { WebsocketEventType } from '../enumerations/websocket-event-type.enumeration';
import { BaseWebsocketEvent } from './base.websocket-event';

export class TestWebsocketEvent extends BaseWebsocketEvent {
  message = 'The test is a success 👍';

  constructor() {
    super(WebsocketEventType.Test);
  }
}
