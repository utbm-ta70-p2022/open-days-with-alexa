import { apiRoutes } from '@libraries/lib-common';
import { AlexaRequest } from '@libraries/lib-nestjs';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlexaSkillsService } from '../../domain/services/alexa-skills.service';

@ApiTags(apiRoutes.alexaSkills.root)
@Controller(apiRoutes.alexaSkills.root)
export class AlexaSkillsController {
  constructor(private readonly _alexaSkillsService: AlexaSkillsService) {}

  @Post()
  @ApiOperation({ summary: 'listens Alexa requests' })
  async listensAlexaRequests(@Body() command: AlexaRequest): Promise<void> {
    return this._alexaSkillsService.handleAlexaRequest(command);
  }
}
