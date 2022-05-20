import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';

export class DiplomeAlexaHandler implements RequestHandler {
  constructor(private readonly _informationService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.diplome.name
    );
  }

  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Voici les informations à propos du diplome.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(
        'Diplome',
        speechText,
        'https://open-days-with-alexa.loicbertrand.net/assets/images/diploma.png'
      )
      .withShouldEndSession(false)
      .getResponse();
  }
}
