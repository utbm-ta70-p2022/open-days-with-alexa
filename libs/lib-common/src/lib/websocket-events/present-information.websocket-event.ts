import { WebsocketEventType } from '../enumerations/websocket-event-type.enumeration';
import { InformationModel } from '../models/information.model';
import { BaseWebsocketEvent } from './base.websocket-event';

export class PresentInformationWebsocketEvent extends BaseWebsocketEvent {
  information: InformationModel;

  constructor() {
    super(WebsocketEventType.PresentInformation);
  }
}
