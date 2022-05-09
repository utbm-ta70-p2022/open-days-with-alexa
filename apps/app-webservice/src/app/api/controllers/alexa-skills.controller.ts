import { apiRoutes } from '@libraries/lib-common';
import { Body, Controller, Post, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestEnvelope } from 'ask-sdk-model';
import { IncomingHttpHeaders } from 'http';
import { AlexaSkillsService } from '../../domain/services/alexa-skills.service';

@ApiTags(apiRoutes.alexaSkills.root)
@Controller(apiRoutes.alexaSkills.root)
export class AlexaSkillsController {
  constructor(private readonly _alexaSkillsService: AlexaSkillsService) {}

  @Post()
  @ApiOperation({ summary: 'listens Alexa requests' })
  async listensAlexaRequests(@Headers() headers: IncomingHttpHeaders, @Body() command: RequestEnvelope): Promise<any> {
    return this._alexaSkillsService.handleAlexaRequest(headers, command);
  }
}
