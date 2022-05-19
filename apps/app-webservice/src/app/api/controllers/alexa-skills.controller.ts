import { apiRoutes } from '@libraries/lib-common';
import { Body, Controller, Post, Headers, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { AlexaSkillsService } from '../../domain/services/alexa-skills.service';
import { AlexaRequestVerifierGuard } from '../guards/alexa-request-verifier.guard';

@ApiTags(apiRoutes.alexaSkills.root)
@Controller(apiRoutes.alexaSkills.root)
export class AlexaSkillsController {
  constructor(private readonly _alexaSkillsService: AlexaSkillsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success in processing the Alexa request',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Failed to process Alexa request' })
  @ApiOperation({ summary: 'listens Alexa requests' })
  @UseGuards(AlexaRequestVerifierGuard)
  async listenAlexaRequests(@Body() requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    return await this._alexaSkillsService.handleRequest(requestEnvelope);
  }
}
