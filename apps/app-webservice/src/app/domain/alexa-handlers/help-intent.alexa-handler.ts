import { alexaImages, informationIds } from '@libraries/lib-common';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { InformationService } from '../services/information.service';
import { Response } from 'ask-sdk-model';

export class HelpIntentAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    await this._informationsService.present(informationIds.help);
    return handlerInput.responseBuilder
      .speak('Je vais vous afficher une liste de question que vous pouvez me poser')
      .withStandardCard(
        'Aide',
        'Je vais vous afficher une liste de question que vous pouvez me poser',
        alexaImages.help
      )
      .withShouldEndSession(false)
      .getResponse();
  }
}
