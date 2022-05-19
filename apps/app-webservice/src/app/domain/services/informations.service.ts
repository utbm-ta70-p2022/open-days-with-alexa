import {
  InformationModel,
  information,
  PresentInformationWebsocketEvent,
  WebsocketEventType,
} from '@libraries/lib-common';
import { EntityNotFoundError } from '@libraries/lib-nestjs';
import { Injectable } from '@nestjs/common';
import { MainGateway } from '../gateways/main.gateway';

@Injectable()
export class InformationsService {
  constructor(private readonly _mainGateway: MainGateway) {}

  async retrieve(id: string): Promise<InformationModel> {
    const informationItem = information.find((_) => _.id == id);

    if (!information) {
      throw new EntityNotFoundError({ type: InformationModel.constructor.name });
    }

    return informationItem;
  }

  async present(id: string): Promise<void> {
    this._mainGateway.emitEvent<PresentInformationWebsocketEvent>({
      type: WebsocketEventType.PresentInformation,
      informationId: id,
    });
  }
}
