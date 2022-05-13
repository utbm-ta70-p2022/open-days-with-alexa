import { requestContext } from '@fastify/request-context';
import { Injectable, CanActivate, Logger, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AlexaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    Logger.warn(context);
    return true;
  }
}
