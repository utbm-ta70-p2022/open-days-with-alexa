import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { alexaImages, informationIds } from '@libraries/lib-common';
import { InformationService } from '../services/information.service';

const alexaResponseData = {
  speechText: 'Voici les informations à propos de la fisa.',
  card: {
    title: 'FISA',
  },
};

export class FisaAlexaHandler implements RequestHandler {
  constructor(private readonly _informationService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' &&
      getIntentName(requestEnvelope) === intents.definitionFISA.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = alexaResponseData.speechText;

    await this._informationService.present(informationIds.fisaDefinition);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.fisa)
      .withShouldEndSession(false)
      .getResponse();
  }
}
