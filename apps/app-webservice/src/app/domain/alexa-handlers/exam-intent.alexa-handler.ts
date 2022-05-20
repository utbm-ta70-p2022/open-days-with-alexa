import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { informationIds } from '@libraries/lib-common';

const text = {
  speechText: "Nous allons vous afficher les fichiers d'examen.",
  card: {
    title: "Modalitées d'Examen",
    urlImage: ""
  }
};

export class ExamIntentAlexaHandler implements RequestHandler {
  constructor(private readonly _informationService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.examen.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = text.speechText;

    await this._informationService.present(informationIds.examen);

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
