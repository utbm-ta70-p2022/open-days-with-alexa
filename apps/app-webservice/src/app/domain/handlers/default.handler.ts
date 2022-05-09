import * as Alexa from 'ask-sdk-core';

export const LaunchRequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speakOutput = 'Welcome in our skill !!';
    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

export const ErrorHandler = {
  canHandle: () => {
    return true;
  },
  handle: (handlerInput: Alexa.HandlerInput, error: Error) => {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};

export const SessionEndedRequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput: Alexa.HandlerInput) {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};

export const IntentReflectorHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
  },
  handle(handlerInput: Alexa.HandlerInput) {
    Alexa.getIntentName(handlerInput.requestEnvelope);
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

export const FallbackIntentHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";
    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

export const CancelAndStopIntentHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export const HelpIntentHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speakOutput = 'You can say hello to me! How can I help?';

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};
