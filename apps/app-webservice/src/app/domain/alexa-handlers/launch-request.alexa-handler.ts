import { alexaImages } from '@libraries/lib-common';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class LaunchRequestAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  }

  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .speak("Bienvenue à l'UTBM, je suis Alexa, comment puis-je vous aider ?")
      .reprompt('Comment puis-je vous aider ?')
      .withStandardCard(
        'Bienvenue !',
        "Bienvenue à l'UTBM, je suis Alexa, comment puis-je vous aider ?",
        alexaImages.launch
      )
      .withShouldEndSession(false)
      .getResponse();
  }
}
