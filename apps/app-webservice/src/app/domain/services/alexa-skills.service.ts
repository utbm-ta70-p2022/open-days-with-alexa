import { Injectable } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { RequestEnvelope } from 'ask-sdk-model';
import {
  CancelAndStopIntentHandler,
  ErrorHandler,
  FallbackIntentHandler,
  InformeMoiDuMondeIntent,
  IntentReflectorHandler,
  LaunchRequestHandler,
  RegisterBirthdayIntentHandler,
  SessionEndedRequestHandler,
} from '../handlers/default.handler';
import * as Alexa from 'ask-sdk-core';
import { IncomingHttpHeaders } from 'http';
import { SkillRequestSignatureVerifier, TimestampVerifier } from 'ask-sdk-express-adapter';
@Injectable()
export class AlexaSkillsService {
  constructor(private readonly _informationsService: InformationsService) {}

  async handleAlexaRequest(headers: IncomingHttpHeaders, command: RequestEnvelope): Promise<any> {
    const skill = Alexa.SkillBuilders.custom()
      .withSkillId('amzn1.ask.skill.e5cd395b-dec3-436c-95c9-86de8aca63e8')
      .addRequestHandlers(
        LaunchRequestHandler,
        InformeMoiDuMondeIntent,
        RegisterBirthdayIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create();
    try {
      await new SkillRequestSignatureVerifier().verify(JSON.stringify(command), headers);
      await new TimestampVerifier().verify(JSON.stringify(command));
      const response = await skill.invoke(command);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
