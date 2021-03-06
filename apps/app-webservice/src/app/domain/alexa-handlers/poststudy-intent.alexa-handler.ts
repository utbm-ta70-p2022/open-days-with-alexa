import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages, informationIds } from '@libraries/lib-common';

const alexaResponseData = {
  speechText: "Nous allons vous afficher les informations sur les poursuites d'études de la formation FISA.",
  card: {
    title: "Informations poursuite d'étude",
  },
};

export class PostStudyIntentAlexaHandler implements RequestHandler {
  constructor(private readonly _informationService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' &&
      getIntentName(requestEnvelope) === intents.poursuiteEtude.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = alexaResponseData.speechText;

    await this._informationService.present(informationIds.poursuiteEtude);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withStandardCard(alexaResponseData.card.title, speechText, alexaImages.postStudy)
      .withShouldEndSession(false)
      .getResponse();
  }
}
