import { WebsocketEventType } from '../enumerations/websocket-event-type.enumeration';
import { BaseWebsocketEvent } from './base.websocket-event';

export class PresentInformationWebsocketEvent extends BaseWebsocketEvent {
  informationId: string;

  constructor() {
    super(WebsocketEventType.PresentInformation);
  }
}
