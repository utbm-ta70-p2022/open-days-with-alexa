import { Component } from '@angular/core';
import { IpcChannels } from '@libraries/ipc/constants';
import { IpcService } from '../../global/services/ipc.service';

@Component({
  selector: 'app-angular-startup',
  templateUrl: './startup.component.html',
})
export class StartupComponent {
  version = '';

  appTitle = 'Open days with Alexa';

  constructor(private readonly _ipcService: IpcService) {}

  async ngOnInit() {
    this.version = await this._ipcService.query<string>(IpcChannels.common.GET_APP_VERSION);
  }
}
