import { Logger } from '@nestjs/common';
import { ErrorHandler, HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export class ErrorsAlexaHandler implements ErrorHandler {
  reject: (reason?: any) => void;

  constructor(reject: (reason?: any) => void) {
    this.reject = reject;
  }

  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    this.reject(error.message);
    return true;
  }

  handle(handlerInput: HandlerInput, error: Error): Response {
    Logger.log(`handling Alexa error: ${error.message}`, error);

    return handlerInput.responseBuilder
      .speak("Je n'ai pas compris votre commande. Je vous invite à la répéter.")
      .reprompt("Je n'ai pas compris votre commande. Je vous invite à la répéter.")
      .getResponse();
  }
}
