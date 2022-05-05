import { apiRoutes, ExampleModel } from '@libraries/lib-common';
import { JwtGuard, RetrieveExampleRequest, RetrieveExampleResponse } from '@libraries/lib-nestjs';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExamplesService } from '../../domain/services/examples.service';

@ApiTags(apiRoutes.exemples.root)
@Controller(apiRoutes.exemples.root)
export class ExamplesController {
  constructor(private readonly _examplesService: ExamplesService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  @Get(apiRoutes.exemples.retrieveOne)
  @ApiOperation({ summary: 'retrieves one example' })
  async create(@Query() command: RetrieveExampleRequest): Promise<RetrieveExampleResponse> {
    return this._examplesService.retrieveOne(command.id);
  }

  @Post(apiRoutes.exemples.sendMessageToWebsocketClients)
  @ApiOperation({ summary: 'sends a message to the websocket clients' })
  async sendMessageToWebsocketClients(@Body() command: string): Promise<void> {
    return this._examplesService.sendMessageToWebsocketClients(command);
  }
}
