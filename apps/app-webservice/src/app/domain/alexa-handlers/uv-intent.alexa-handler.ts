import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages, informationIds } from '@libraries/lib-common';

const alexaResponseData = {
  speechText: "Une UV est une matière à l'UTBM. C'est l'acronyme pour : unité de valeur.",
  card: {
    title: 'Affichage des informations sur les unités de valeurs',
  },
};

export class UvIntentAlexaHandler implements RequestHandler {
  constructor(private readonly _informationService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.uv.name;
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = alexaResponseData.speechText;

    await this._informationService.present(informationIds.uvVideo);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.uv)
      .withShouldEndSession(false)
      .getResponse();
  }
}
