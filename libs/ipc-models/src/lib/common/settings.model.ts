import { ProxySettingsModel } from './proxy-settings.model';

export class SettingsModel {
  common: {
    proxy: ProxySettingsModel;
  };
  copyTool: {
    maximumFileCountBeforeAskingToCalculateTheirSize: number;
  };
  monitoringTool: {
    enabled: boolean;
  };
}
