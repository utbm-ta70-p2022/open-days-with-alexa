import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';

const data = {
  speechText: "Patientez, nous allons vous afficher une présentation du CFAI à l'écran",
};

export class CfaiOrganizationAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.cfai.name;
  }

  handle(handlerInput: HandlerInput): Response {
    const speechText = data.speechText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(
        'Présentation CFAI',
        speechText,
        'https://open-days-with-alexa.loicbertrand.net/assets/images/cfai-exincourt.jpg'
      )
      .withShouldEndSession(false)
      .getResponse();
  }
}
