import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class UvAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'UV';
  }

  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .speak("Une UV est une matière à l'UTBM. C'est l'acronoyme pour : « unité de valeur »")
      .withSimpleCard('', "Une UV est une matière à l'UTBM. C'est l'acronoyme pour : « unité de valeur »")
      .withShouldEndSession(false)
      .getResponse();
  }
}
