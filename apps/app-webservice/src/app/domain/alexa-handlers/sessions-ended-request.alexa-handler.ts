import { Logger } from '@nestjs/common';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';

export class SessionEndedRequestAlexaHandler implements RequestHandler {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  }

  handle(handlerInput: HandlerInput): Response {
    const sessionEndedRequest = handlerInput.requestEnvelope.request as SessionEndedRequest;
    if (sessionEndedRequest.error) {
      Logger.error(`session ended with error: ${sessionEndedRequest.error.message}`, sessionEndedRequest);
    } else {
      Logger.log(`session ended with reason: ${sessionEndedRequest.reason}`, sessionEndedRequest);
    }

    return handlerInput.responseBuilder.getResponse();
  }
}
