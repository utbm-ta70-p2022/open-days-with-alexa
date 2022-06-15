import { alexaImages } from '@libraries/lib-common';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class HelpIntentAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  }

  handle(handlerInput: HandlerInput): Response {
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
