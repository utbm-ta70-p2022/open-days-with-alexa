import { Logger, Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { ErrorsFilter } from './api/filters/error.filter';

@Module({
  imports: [ApiModule],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {}
