import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { informationIds } from '@libraries/lib-common';

const text = {
  speechText: "Une UV est une matière à l'UTBM. C'est l'acronoyme pour : « unité de valeur »",
  card: {
    title: "Affichage des informations sur les unités de valeurs",
    urlImage: ""
  }
};

export class UvIntentAlexaHandler implements RequestHandler {
  constructor(private readonly _informationService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.uv.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = text.speechText;

    await this._informationService.present(informationIds.uv);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(
        text.card.title,
        speechText,
        text.card.urlImage
      )
      .withShouldEndSession(false)
      .getResponse();
  }
}
