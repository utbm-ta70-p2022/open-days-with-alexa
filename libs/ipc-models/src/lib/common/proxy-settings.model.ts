import { ProxyConfiguration } from '@libraries/ipc/enumerations';

export class ProxySettingsModel {
  configuration: ProxyConfiguration;
  host?: string;
  port?: number;
  credentials: boolean;
  username?: string;
  password?: string;
}
