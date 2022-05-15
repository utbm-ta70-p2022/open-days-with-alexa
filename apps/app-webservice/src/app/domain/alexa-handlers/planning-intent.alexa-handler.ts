import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
//import * as Alexa from 'ask-sdk-core';

const text = {
  intentName: "PlanningIntent",
  speechText: "Patientez, le planning que vous avez demandé va s'afficher à l'écran.",
  slotName: "year"
}

export class PlanningIntentAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === text.intentName)
    );
  }

  handle(handlerInput: HandlerInput): Response {
    // call heavy client with year parameter
    const year = handlerInput.requestEnvelope.getSlotValue(handlerInput.requestEvenlope, text.slotName);
    // or const year = Alexa.getSlotValue(handlerInput.requestEvenlope, text.slotName);
    const speechText = text.speechText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText) // Au bout de 8 seconds redit ce qui a été donner en paramètre
      .withSimpleCard('Demande de planning', speechText) // https://developer.amazon.com/en-US/docs/alexa/custom-skills/include-a-card-in-your-skills-response.html
      .getResponse();
  }
}
