import { AlexaRequest } from '@libraries/lib-nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { InformationsService } from './informations.service';

@Injectable()
export class AlexaSkillsService {
  constructor(private readonly _informationsService: InformationsService) {}

  async handleAlexaRequest(alexaRequest: AlexaRequest): Promise<void> {
    Logger.log(JSON.stringify(alexaRequest));
    this._informationsService.present('planning');
  }
}
