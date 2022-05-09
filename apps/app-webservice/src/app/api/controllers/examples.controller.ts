import { apiRoutes } from '@libraries/lib-common';
import { RetrieveExampleRequest, RetrieveExampleResponse } from '@libraries/lib-nestjs';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
}
