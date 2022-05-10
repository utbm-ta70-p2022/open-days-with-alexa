import { Injectable, CanActivate, ExecutionContext, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AlexaGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context;

    try {
      Logger.log(request);
      // await new SkillRequestSignatureVerifier().verify('' + req.body, req.headers);
      // await new TimestampVerifier().verify('' + req.body);
      return true;
    } catch (err) {
      console.log('ERROR');
      console.log(err);
      return false;
    }
  }
}
