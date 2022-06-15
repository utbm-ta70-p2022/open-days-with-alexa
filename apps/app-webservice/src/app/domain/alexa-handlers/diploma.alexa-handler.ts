import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages, informationIds } from '@libraries/lib-common';

const alexaResponseData = {
  speechText: 'Voici les informations à propos du diplome.',
  card: {
    title: 'Diplome',
  },
};

export class DiplomaAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.diploma.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = alexaResponseData.speechText;

    await this._informationsService.present(informationIds.diplomaValidation);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.diploma)
      .withShouldEndSession(false)
      .getResponse();
  }
}
