import {
  InformationModel,
  informations,
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
    const information = informations.find((_) => _.id == id);

    if (!information) {
      throw new EntityNotFoundError({ type: InformationModel.constructor.name });
    }

    return information;
  }

  async present(id: string): Promise<void> {
    const information = await this.retrieve(id);

    this._mainGateway.emitEvent<PresentInformationWebsocketEvent>({
      type: WebsocketEventType.PresentInformation,
      information: information,
    });
  }
}
