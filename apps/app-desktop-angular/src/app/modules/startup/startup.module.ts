import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { Component } from '@angular/core';
import { IpcChannels } from '@libraries/lib-common';
import { IpcService } from '../../global/services/ipc.service';

@Component({
  template: `
    <div style="height: 100vh; width: 100vw; overflow: hidden" class="flex flex-column">
      <div class="m-auto flex flex-column">
        <img src="assets/images/icon.ico" height="60px" width="60px" alt="" class="mx-auto" draggable="false" />
        <div class="mx-auto font-bold text-blue-900 mt-1">{{ appTitle }}</div>
        <small class="mx-auto mt-2 text-blue-900">{{ version }}</small>
      </div>
    </div>
  `,
})
export class StartupComponent {
  version = '';

  appTitle = 'Open days with Alexa';

  constructor(private readonly _ipcService: IpcService) {}

  async ngOnInit() {
    this.version = await this._ipcService.query<string>(IpcChannels.common.GET_APP_VERSION);
  }
}

@NgModule({
  declarations: [StartupComponent],
  providers: [StartupModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: StartupComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class StartupModule {}
