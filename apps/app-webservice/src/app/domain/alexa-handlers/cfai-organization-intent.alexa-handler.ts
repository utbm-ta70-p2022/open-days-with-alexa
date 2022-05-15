import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

const text = {
  intentName: "CfaiOrganizationIntent",
  speechText: "Patientez, le nous allons vous afficher une présentation du CFAI à l'écran",
}

export class CfaiOrganizationAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === text.intentName)
    );
  }

  handle(handlerInput: HandlerInput): Response {
    const speechText = text.speechText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText) // After 8 seconds speak again the speech text
      .withSimpleCard('Présentation CFAI', speechText) // https://developer.amazon.com/en-US/docs/alexa/custom-skills/include-a-card-in-your-skills-response.html
      .getResponse();
  }
}
