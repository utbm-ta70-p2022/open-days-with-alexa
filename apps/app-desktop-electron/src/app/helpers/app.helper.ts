import { environment } from '../../environments/environment';

export class AppHelper {
  public static isDevelopmentMode(): boolean {
    const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnvironment: boolean = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
    return isEnvironmentSet ? getFromEnvironment : !environment.production;
  }
}
