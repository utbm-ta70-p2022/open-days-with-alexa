import { InfrastructureError } from '../../../../../../libs/lib-nestjs/src/lib/errors/infrastructure.error';
import { ApiError } from '../../../../../../libs/lib-nestjs/src/lib/errors/api.error';
import { DomainError } from '../../../../../../libs/lib-nestjs/src/lib/errors/domain.error';
import { Logger, Catch, ExceptionFilter, ArgumentsHost, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  constructor(
    private readonly _httpAdapterHost: HttpAdapterHost,
    private readonly _logger: Logger,
    private readonly _i18nRequestScopeService: I18nRequestScopeService
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    let httpStatusCode: number;
    let httpMessage: string;

    if (exception instanceof ApiError || exception instanceof DomainError) {
      httpStatusCode = HttpStatus.BAD_REQUEST;
      httpMessage = await this.retrieveErrorTranslation(exception.constructor.name);
      this._logger.warn(exception.message, exception);
    } else if (exception instanceof InfrastructureError) {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      httpMessage = await this._i18nRequestScopeService.translate(exception.constructor.name);
      this._logger.error(exception.message, exception);
    } else if (exception instanceof UnauthorizedException) {
      httpStatusCode = HttpStatus.UNAUTHORIZED;
      httpMessage = await this.retrieveErrorTranslation('Unauthorized');
    } else {
      httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      httpMessage = await this.retrieveErrorTranslation('Unkown');
      this._logger.error((exception as any).message, exception);
    }

    this._httpAdapterHost.httpAdapter.reply(
      host.switchToHttp().getResponse(),
      { statusCode: httpStatusCode, message: httpMessage },
      httpStatusCode
    );
  }

  async retrieveErrorTranslation(errorName: string): Promise<string> {
    let translation: string;

    try {
      translation = await this._i18nRequestScopeService.translate(`errors.${errorName}`);
    } catch (error) {
      return 'Error translation not available';
    }

    return translation;
  }
}
