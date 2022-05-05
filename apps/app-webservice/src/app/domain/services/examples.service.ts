import { ExampleModel, SendMessageWebsocketEvent, WebsocketEventType } from '@libraries/lib-common';
import { EntityNotFoundError } from '@libraries/lib-nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { MainGateway } from '../gateways/main.gateway';

@Injectable()
export class ExamplesService {
  constructor(private readonly _mainGateway: MainGateway) {}

  examples: ExampleModel[] = [
    {
      id: 'a',
      name: 'First example',
    },
    {
      id: 'b',
      name: 'Second example',
    },
    {
      id: 'c',
      name: 'Third example',
    },
  ];

  async retrieveOne(id: string): Promise<ExampleModel> {
    let example: ExampleModel;

    try {
      example = this.examples.find((_) => _.id === id);
      if (!example) {
        throw new EntityNotFoundError({ type: ExampleModel.constructor.name });
      }
    } catch (error) {
      throw new EntityNotFoundError({ originalError: error, type: ExampleModel.constructor.name });
    }

    return example;
  }

  sendMessageToWebsocketClients(message: string) {
    this._mainGateway.emitEvent<SendMessageWebsocketEvent>({ type: WebsocketEventType.SendMessage, message: message });
  }
}
