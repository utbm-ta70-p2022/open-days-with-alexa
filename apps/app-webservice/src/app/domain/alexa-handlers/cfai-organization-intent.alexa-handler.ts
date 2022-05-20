import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages } from '@libraries/lib-common';

const alexaResponseData = {
  speechText: "Patientez, nous allons vous afficher une présentation du CFAI à l'écran.",
  card: {
    title: 'Présentation CFAI',
  },
};

export class CfaiOrganizationAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.cfai.name;
  }

  handle(handlerInput: HandlerInput): Response {
    const speechText = alexaResponseData.speechText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.cfai)
      .withShouldEndSession(false)
      .getResponse();
  }
}
