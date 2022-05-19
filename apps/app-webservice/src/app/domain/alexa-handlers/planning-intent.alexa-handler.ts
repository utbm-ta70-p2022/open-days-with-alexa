import { HandlerInput, RequestHandler, getSlotValue, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';
import { InformationsService } from '../services/informations.service';
import { informationIds } from '@libraries/lib-common';

const text = {
  speechText: "Patientez, le planning que vous avez demandé va s'afficher à l'écran.",
};

export class PlanningIntentAlexaHandler implements RequestHandler {
  constructor(private readonly _informationsService: InformationsService) {}

  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return (
      getRequestType(requestEnvelope) === 'IntentRequest' && getIntentName(requestEnvelope) === intents.planning.name
    );
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    // call heavy client with year parameter
    const year = getSlotValue(handlerInput.requestEnvelope, intents.planning.slot.name);

    const speechText = text.speechText;

    await this._informationsService.present(informationIds.planning);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText) // After 8 seconds speak again the speech text
      .withSimpleCard('Demande de planning', speechText) // https://developer.amazon.com/en-US/docs/alexa/custom-skills/include-a-card-in-your-skills-response.html
      .withShouldEndSession(false)
      .getResponse();
  }
}