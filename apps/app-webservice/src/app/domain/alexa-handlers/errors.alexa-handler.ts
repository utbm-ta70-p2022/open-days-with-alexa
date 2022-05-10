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
    Logger.error(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I don't understand your command. Please say it again.")
      .reprompt("Sorry, I don't understand your command. Please say it again.")
      .getResponse();
  }
}
