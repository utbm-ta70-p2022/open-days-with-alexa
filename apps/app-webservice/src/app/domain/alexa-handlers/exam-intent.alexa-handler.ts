import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages, informationIds } from '@libraries/lib-common';

const alexaResponseData = {
  speechText: "Nous allons vous afficher les fichiers d'examen.",
  card: {
    title: "Modalités d'examen",
  },
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
    const speechText = alexaResponseData.speechText;

    await this._informationService.present(informationIds.examen);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.exam)
      .withShouldEndSession(false)
      .getResponse();
  }
}
