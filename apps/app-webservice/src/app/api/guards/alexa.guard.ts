import { ExecutionContext, CanActivate, Injectable, Logger } from '@nestjs/common';
import { SkillRequestSignatureVerifier, TimestampVerifier } from 'ask-sdk-express-adapter';

@Injectable()
export class AlexaGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest().headers;
    const rawBody = context.switchToHttp().getRequest().rawBody;

    try {
      await new SkillRequestSignatureVerifier().verify(rawBody, headers);
      await new TimestampVerifier().verify(rawBody);
    } catch (error) {
      Logger.error(error.message);
    }

    return true;
  }
}
