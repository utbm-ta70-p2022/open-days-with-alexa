import { Injectable, Logger } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestAlexaHandler } from '../alexa-handlers/launch-request.alexa-handler';
import { UvAlexaHandler } from '../alexa-handlers/uv.alexa-handler';
import { HelpIntentAlexaHandler } from '../alexa-handlers/help-intent.alexa-handler';
import { CancelAndStopIntentAlexaHandler } from '../alexa-handlers/cancel-and-stop-intent.alexa-handler';
import { SessionEndedRequestAlexaHandler } from '../alexa-handlers/sessions-ended-request.alexa-handler';
import { ErrorsAlexaHandler } from '../alexa-handlers/errors.alexa-handler';
import { PlanningIntentAlexaHandler } from '../alexa-handlers/planning-intent.alexa-handler';
import { CfaiOrganizationAlexaHandler } from '../alexa-handlers/cfai-organization-intent.alexa-handler';

@Injectable()
export class AlexaSkillsService {
  constructor(private readonly _informationsService: InformationsService) {}

  async handleRequest(requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;

    Logger.log(`handling Alexa request of type: ${requestEnvelope.request.type}`, requestEnvelope);

    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
        SkillBuilders.custom()
          .addRequestHandlers(
            new LaunchRequestAlexaHandler(),
            new PlanningIntentAlexaHandler(this._informationsService),
            new CfaiOrganizationAlexaHandler(this._informationsService),
            // above add your instance
            new UvAlexaHandler(),
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
      Logger.error(`unable to handle Alexa request`, error);
    }

    return responseEnvelope;
  }
}
