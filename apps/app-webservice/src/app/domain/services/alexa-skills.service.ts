import { Injectable, Logger } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { SkillBuilders } from 'ask-sdk-core';
import { IncomingHttpHeaders } from 'http';
import { LaunchRequestAlexaHandler } from '../alexa-handlers/launch-request.alexa-handler';
import { AskWeatherIntentAlexaHandler } from '../alexa-handlers/ask-weather-intent.alexa-handler';
import { HelpIntentAlexaHandler } from '../alexa-handlers/help-intent.alexa-handler';
import { CancelAndStopIntentAlexaHandler } from '../alexa-handlers/cancel-and-stop-intent.alexa-handler';
import { SessionEndedRequestAlexaHandler } from '../alexa-handlers/sessions-ended-request.alexa-handler';
import { ErrorsAlexaHandler } from '../alexa-handlers/errors.alexa-handler';
import {FisaAlexaHandler} from '../alexa-handlers/fisa.alexa-handler';
import {ApprentissageAlexaHandler} from '../alexa-handlers/apprentissage.alexa-handler';
import { ModalitesAlexaHandler } from '../alexa-handlers/modalites.alexa-handler';
import { DiplomeAlexaHandler } from '../alexa-handlers/diplome.alexa-handler';

@Injectable()
export class AlexaSkillsService {
  constructor(private readonly _informationsService: InformationsService) {}

  async handleRequest(
    requestHeaders: IncomingHttpHeaders,
    requestEnvelope: RequestEnvelope
  ): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;

    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
        SkillBuilders.custom()
          .addRequestHandlers(
            new LaunchRequestAlexaHandler(),
            new AskWeatherIntentAlexaHandler(),
            new FisaAlexaHandler(),
            new ModalitesAlexaHandler(),
            new DiplomeAlexaHandler(),
            new ApprentissageAlexaHandler(),
            new HelpIntentAlexaHandler(),
            new CancelAndStopIntentAlexaHandler(),
            new SessionEndedRequestAlexaHandler()
          )
          .addErrorHandlers(new ErrorsAlexaHandler(reject))
          .lambda()(requestEnvelope, requestEnvelope.context, (error: Error, result: ResponseEnvelope) => {
          if (error) {
            reject(error.message);
          }
          resolve(result);
        });
      });
    } catch (error) {
      Logger.error(error);
    }

    return responseEnvelope;
  }
}
