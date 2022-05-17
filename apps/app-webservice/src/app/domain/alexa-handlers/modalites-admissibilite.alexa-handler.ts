import { HandlerInput, RequestHandler, getIntentName, getRequestType } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

const text = {
  intentName: "ModaliteAdmissibilite", // /!\ Malo: check the real intent value to match /!\
  speechText: "Voici les informations à propos des modalités d'apprentissage.",
}

export class ModalitesAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return getRequestType(requestEnvelope) === 'IntentRequest'
        && getIntentName(requestEnvelope) === text.intentName;
  }

  handle(handlerInput: HandlerInput): Response {
    const speechText = text.speechText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("", speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
}
