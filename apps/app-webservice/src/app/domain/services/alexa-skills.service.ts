import { Injectable, Logger } from '@nestjs/common';
import { InformationService } from './information.service';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestAlexaHandler } from '../alexa-handlers/launch-request.alexa-handler';
import { UvIntentAlexaHandler } from '../alexa-handlers/uv-intent.alexa-handler';
import { HelpIntentAlexaHandler } from '../alexa-handlers/help-intent.alexa-handler';
import { CancelAndStopIntentAlexaHandler } from '../alexa-handlers/cancel-and-stop-intent.alexa-handler';
import { SessionEndedRequestAlexaHandler } from '../alexa-handlers/sessions-ended-request.alexa-handler';
import { ErrorsAlexaHandler } from '../alexa-handlers/errors.alexa-handler';
import { FisaAlexaHandler } from '../alexa-handlers/fisa.alexa-handler';
import { ApprentissageAlexaHandler } from '../alexa-handlers/apprentissage.alexa-handler';
import { ModalitesAlexaHandler } from '../alexa-handlers/modalites-admissibilite.alexa-handler';
import { DiplomeAlexaHandler } from '../alexa-handlers/diplome.alexa-handler';
import { ExamIntentAlexaHandler } from '../alexa-handlers/exam-intent.alexa-handler';
import { CfaiOrganizationAlexaHandler } from '../alexa-handlers/cfai-organization-intent.alexa-handler';
import { PostStudyIntentAlexaHandler } from '../alexa-handlers/poststudy-intent.alexa-handler';
import { PlanningIntentAlexaHandler } from '../alexa-handlers/planning-intent.alexa-handler copy';

@Injectable()
export class AlexaSkillsService {
  constructor(private readonly _informationService: InformationService) {}

  async handleRequest(requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    let responseEnvelope: ResponseEnvelope;

    Logger.log(`handling Alexa request of type: ${requestEnvelope.request.type}`, requestEnvelope);

    try {
      responseEnvelope = await new Promise<ResponseEnvelope>((resolve, reject) => {
        SkillBuilders.custom()
          .addRequestHandlers(
            new LaunchRequestAlexaHandler(),
            new FisaAlexaHandler(this._informationService),
            new ModalitesAlexaHandler(this._informationService),
            new DiplomeAlexaHandler(this._informationService),
            new ApprentissageAlexaHandler(this._informationService),
            new PlanningIntentAlexaHandler(this._informationService),
            new CfaiOrganizationAlexaHandler(this._informationService),
            new UvIntentAlexaHandler(this._informationService),
            new ExamIntentAlexaHandler(this._informationService),
            new PostStudyIntentAlexaHandler(this._informationService),
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
