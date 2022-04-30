import { ProxyConfiguration } from '@libraries/ipc/enumerations';
import { SettingsModel } from '@libraries/ipc/models';

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
