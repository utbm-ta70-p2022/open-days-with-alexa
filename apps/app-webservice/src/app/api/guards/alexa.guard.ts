import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SkillRequestSignatureVerifier, TimestampVerifier } from 'ask-sdk-express-adapter';

@Injectable()
export class AlexaGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      await new SkillRequestSignatureVerifier().verify('' + req.body, req.headers);
      await new TimestampVerifier().verify('' + req.body);
      return true;
    } catch (err) {
      console.log('ERROR');
      console.log(err);
      return false;
    }
  }
}
