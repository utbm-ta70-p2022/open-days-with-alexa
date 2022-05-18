import { HandlerInput, RequestHandler, getIntentName, getRequestType} from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { intents } from '@libraries/lib-alexa';

const data = {
  speechText: "Patientez, nous allons vous afficher une présentation du CFAI à l'écran",
}

export class CfaiOrganizationAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const requestEnvelope = handlerInput.requestEnvelope;
    return getRequestType(requestEnvelope) === 'IntentRequest' &&
     getIntentName(requestEnvelope) === intents.cfai.name;
  }

  handle(handlerInput: HandlerInput): Response {
    const speechText = data.speechText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText) // After 8 seconds speak again the speech text
      .withSimpleCard('Présentation CFAI', speechText) // https://developer.amazon.com/en-US/docs/alexa/custom-skills/include-a-card-in-your-skills-response.html
      .withShouldEndSession(false)
      .getResponse();
  }
}
