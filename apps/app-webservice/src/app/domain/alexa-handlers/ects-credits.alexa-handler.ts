import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages, informationIds } from '@libraries/lib-common';

const alexaResponseData = {
  speechText: 'Voici les informations à propos des crédits ECTS.',
  card: {
    title: 'Credits ECTS',
  },
};

export class EctsCreditsAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.etcsCredits.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = alexaResponseData.speechText;

    await this._informationsService.present(informationIds.ectsCredits);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.credits)
      .withShouldEndSession(false)
      .getResponse();
  }
}
