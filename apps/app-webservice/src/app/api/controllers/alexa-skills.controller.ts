import { apiRoutes } from '@libraries/lib-common';
import { Body, Controller, Post, Headers, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { IncomingHttpHeaders } from 'http';
import { AlexaSkillsService } from '../../domain/services/alexa-skills.service';
import { AlexaGuard } from '../guards/alexa.guard';

@ApiTags(apiRoutes.alexaSkills.root)
@Controller(apiRoutes.alexaSkills.root)
export class AlexaSkillsController {
  constructor(private readonly _alexaSkillsService: AlexaSkillsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'listens Alexa requests' })
  @UseGuards(new AlexaGuard())
  async listenAlexaRequests(
    @Headers() requestHeaders: IncomingHttpHeaders,
    @Body() requestEnvelope: RequestEnvelope
  ): Promise<ResponseEnvelope> {
    return await this._alexaSkillsService.handleRequest(requestHeaders, requestEnvelope);
  }
}
