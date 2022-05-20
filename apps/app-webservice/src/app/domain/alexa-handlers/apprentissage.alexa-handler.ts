import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { alexaImages, informationIds } from '@libraries/lib-common';

export class ApprentissageAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' &&
      getIntentName(requestEnvelope) === intents.apprentissage.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = "Voici les informations à propos de l'apprentissage.";

    await this._informationsService.present(informationIds.apprenticeshipDefinition);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('', speechText)
      .withStandardCard('Apprentissage', speechText, alexaImages.apprentice)
      .withShouldEndSession(false)
      .getResponse();
  }
}
