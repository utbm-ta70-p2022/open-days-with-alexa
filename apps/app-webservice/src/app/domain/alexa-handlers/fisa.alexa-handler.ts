import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { informationIds } from '@libraries/lib-common';
import { InformationsService } from '../services/informations.service';

export class FisaAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationsService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return getRequestType(requestEnvelope) === 'IntentRequest'
        && getIntentName(requestEnvelope) === intents.definitionFISA.name;
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = 'Voici les informations à propos de la fisa.';

    await this._informationsService.present(informationIds.apprenticeshipDefinition);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("", speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
}
