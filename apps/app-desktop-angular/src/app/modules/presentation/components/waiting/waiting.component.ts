import { Component, OnInit } from '@angular/core';
import { IpcChannels } from '@libraries/lib-common';
import { Select } from '@ngxs/store';
import { ServerStatusState } from '../../../../global/store/states/server-status.state';
import { Observable } from 'rxjs';
import { IpcService } from '../../../../global/services/ipc.service';

@Component({
  template: `
    <div style="height: 100vh; width: 100vw; overflow: hidden" class="flex flex-column">
      <div class="m-auto flex flex-column">
        <img src="assets/images/icon.ico" height="60px" width="60px" alt="" class="mx-auto" draggable="false" />
        <div class="mx-auto font-bold text-blue-900 mt-1">{{ appTitle }}</div>
        <small class="mx-auto mt-2 text-blue-900">{{ version }}</small>

        <ng-container *ngIf="serverStatus$ | async; then serverConnected; else serverDisconnected"></ng-container>

        <div class="message mx-auto mt-4">La FISA INFO vous souhaite la bienvenue !</div>
        <div class="message mx-auto mt-4">
          Demandez des renseignements à Alexa en commençant par « <strong>informe-moi</strong> »
        </div>
        <div class="message mx-auto mt-4">
          Ensuite, vous pourrez poser différentes questions comme : « <strong>Que veut dire UV ?</strong> » ou encore «
          <strong>Affiche-moi le planning de la formation</strong> »
        </div>
      </div>
    </div>

    <ng-template #serverConnected>
      <p-tag class="mx-auto mt-4" icon="pi pi-check" severity="success" value="Serveur connecté"></p-tag>
    </ng-template>

    <ng-template #serverDisconnected>
      <p-tag class="mx-auto mt-4" icon="pi pi-times" severity="danger" value="Serveur déconnecté"></p-tag>
    </ng-template>
  `,
  styles: [
    `
      .message {
        font-size: 1.4rem;
        margin: auto;
        padding: 15px;
        background: #575e6a;
        position: relative;
        border-radius: 12px;
        color: #fff;
      }

      .message:after {
        content: '';
        display: inline-block;
        border-style: solid;
        border-width: 10px 10px 0;
        border-color: #575e6a transparent;
        position: absolute;
        bottom: -10px;
        right: 20px;
      }
    `,
  ],
})
export class WaitingComponent implements OnInit {
  @Select(ServerStatusState) serverStatus$: Observable<boolean>;

  version = '';

  appTitle = 'Open days with Alexa';

  constructor(private readonly _ipcService: IpcService) {}

  async ngOnInit() {
    this.version = await this._ipcService.query<string>(IpcChannels.common.GET_APP_VERSION);
  }
}
