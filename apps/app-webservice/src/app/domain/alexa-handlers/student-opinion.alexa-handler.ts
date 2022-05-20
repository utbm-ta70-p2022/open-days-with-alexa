import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationService } from '../services/information.service';
import { informationIds } from '@libraries/lib-common';

export class StudentsOpinionAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' &&
      getIntentName(requestEnvelope) === intents.studentsOpinion.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = "Voici quelques avis d'élèves de la formation.";

    await this._informationsService.present(informationIds.studentsOpinion);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('', speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
}
