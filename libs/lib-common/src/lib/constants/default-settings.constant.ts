import { ProxyConfiguration } from '../enumerations/proxy-configuration.enumeration';
import { SettingsModel } from '../models/settings.model';

export const DEFAULT_SETTINGS: SettingsModel = {
  common: {
    proxy: {
      configuration: ProxyConfiguration.Off,
      host: '',
      port: 80,
      credentials: false,
      username: '',
      password: '',
    },
  },
  copyTool: {
    maximumFileCountBeforeAskingToCalculateTheirSize: 500,
  },
  monitoringTool: {
    enabled: false,
  },
};
