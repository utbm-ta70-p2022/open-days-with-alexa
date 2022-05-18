import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { SkillRequestSignatureVerifier, TimestampVerifier } from 'ask-sdk-express-adapter';
import { AlexaRequestVerificationError } from '../errors/alexa-request-verification.error';

@Injectable()
export class AlexaRequestVerifierGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest().headers;
    const rawBody = context.switchToHttp().getRequest().rawBody;

    try {
      await new SkillRequestSignatureVerifier().verify(rawBody, headers);
      await new TimestampVerifier().verify(rawBody);
    } catch (error) {
      throw new AlexaRequestVerificationError(error);
    }

    return true;
  }
}
