import { apiRoutes } from '@libraries/lib-common';
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { environment } from '../../../environments/environment';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { AlexaSkillsService } from '../../domain/services/alexa-skills.service';
import { InformationService } from '../../domain/services/information.service';
import { AlexaRequestVerifierGuard } from '../guards/alexa-request-verifier.guard';

@ApiTags(apiRoutes.alexaSkills.root)
@Controller(apiRoutes.alexaSkills.root)
export class AlexaSkillsController {
  constructor(
    private readonly _alexaSkillsService: AlexaSkillsService,
    private readonly _informationService: InformationService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success in processing the request from Alexa',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'failed to process the request from Alexa' })
  @ApiOperation({ summary: 'listens Alexa requests' })
  @UseGuards(AlexaRequestVerifierGuard)
  async listenAlexaRequests(@Body() requestEnvelope: RequestEnvelope): Promise<ResponseEnvelope> {
    return await this._alexaSkillsService.handleRequest(requestEnvelope);
  }

  @Get('displayInformation/:id')
  @ApiExcludeEndpoint(environment.production)
  async development(@Param('id') id: string): Promise<void> {
    if (environment.production) {
      throw new NotFoundException();
    }
    return await this._informationService.present(id);
  }
}
