import { Component, Input, OnInit } from '@angular/core';
import { ProxyConfiguration } from '@libraries/ipc/enumerations';
import { ProxySettingsModel } from '@libraries/ipc/models';

@Component({
  selector: 'app-angular-proxy-settings',
  templateUrl: './proxy-settings.component.html',
  styleUrls: ['./proxy-settings.component.scss'],
})
export class ProxySettingsComponent implements OnInit {
  private readonly _proxyConfigurationOff = 'Off';
  private readonly _proxyConfigurationCustom = 'Custom';

  @Input() proxySettings: ProxySettingsModel;

  selectedConfiguration: { label: string; code: ProxyConfiguration };

  configurationOptions: { label: string; code: ProxyConfiguration }[] = [
    {
      label: this._proxyConfigurationOff,
      code: ProxyConfiguration.Off,
    },
    {
      label: this._proxyConfigurationCustom,
      code: ProxyConfiguration.Custom,
    },
  ];

  get isProxyConfigurationCustom(): boolean {
    return this.selectedConfiguration.code == ProxyConfiguration.Custom;
  }

  ngOnInit() {
    switch (this.proxySettings?.configuration) {
      case ProxyConfiguration.Custom:
        this.selectedConfiguration = {
          label: this._proxyConfigurationCustom,
          code: ProxyConfiguration.Custom,
        };
        break;
      default:
        this.selectedConfiguration = {
          label: this._proxyConfigurationOff,
          code: ProxyConfiguration.Off,
        };
    }
  }

  handleConfigurationChange() {
    this.proxySettings.configuration = ProxyConfiguration[this.selectedConfiguration.code];
  }
}
