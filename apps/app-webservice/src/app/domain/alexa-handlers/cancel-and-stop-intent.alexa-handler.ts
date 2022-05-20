import { alexaImages } from '@libraries/lib-common';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class CancelAndStopIntentAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    );
  }

  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .speak("L'UTBM vous remercie pour votre visite ! Bonne journée !")
      .withStandardCard('A bientôt !', "L'UTBM vous remercie pour votre visite ! Bonne journée !", alexaImages.goodbye)
      .withShouldEndSession(true)
      .getResponse();
  }
}
