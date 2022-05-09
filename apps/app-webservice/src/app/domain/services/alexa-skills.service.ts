import { Injectable, Logger } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { RequestEnvelope } from 'ask-sdk-model';
import {
  CancelAndStopIntentHandler,
  ErrorHandler,
  FallbackIntentHandler,
  IntentReflectorHandler,
  LaunchRequestHandler,
  SessionEndedRequestHandler,
} from '../handlers/default.handler';
import * as Alexa from 'ask-sdk-core';
import { IncomingHttpHeaders } from 'http';
@Injectable()
export class AlexaSkillsService {
  constructor(private readonly _informationsService: InformationsService) {}

  async handleAlexaRequest(headers: IncomingHttpHeaders, command: RequestEnvelope): Promise<any> {
    const skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create();
    try {
      const response = await skill.invoke(command);
      Logger.log(`RESPONSE++++${JSON.stringify(response)}`);
      return response;
    } catch (err) {
      Logger.log(`ERROR++++${err}`);
      throw err;
    }
  }
}
