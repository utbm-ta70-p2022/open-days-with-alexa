import { ProxyConfiguration } from '@libraries/lib-common';

export class ProxySettingsModel {
  configuration: ProxyConfiguration;
  host?: string;
  port?: number;
  credentials: boolean;
  username?: string;
  password?: string;
}
