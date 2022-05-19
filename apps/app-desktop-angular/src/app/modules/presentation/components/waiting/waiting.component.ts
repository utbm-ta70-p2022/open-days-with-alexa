import { Component, OnInit } from '@angular/core';
import { IpcChannels } from '@libraries/lib-common';
import { IpcService } from '../../../../global/services/ipc.service';

@Component({
  template: `
    <div style="height: 100vh; width: 100vw; overflow: hidden" class="flex flex-column">
      <div class="m-auto flex flex-column" pTooltip="Attente d'une instruction d'affichage" tooltipPosition="bottom">
        <img src="assets/images/icon.ico" height="60px" width="60px" alt="" class="mx-auto" draggable="false" />
        <div class="mx-auto font-bold text-blue-900 mt-1">{{ appTitle }}</div>
        <small class="mx-auto mt-2 text-blue-900">{{ version }}</small>
        <p-progressSpinner
          [style]="{ width: '50px', height: '50px' }"
          styleClass="custom-spinner"
          class="mx-auto mt-1"
          strokeWidth="3"
          fill="var(--surface-ground)"
          animationDuration="5s"
        ></p-progressSpinner>
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .custom-spinner .p-progress-spinner-circle {
        animation: custom-progress-spinner-dash 1.5s ease-in-out infinite,
          custom-progress-spinner-color 6s ease-in-out infinite;
      }

      @keyframes custom-progress-spinner-color {
        100%,
        0% {
          stroke: #0581c9;
        }
        40% {
          stroke: #575e6a;
        }
        66% {
          stroke: #0581c9;
        }
        80%,
        90% {
          stroke: #575e6a;
        }
      }

      @keyframes custom-progress-spinner-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
    `,
  ],
})
export class WaitingComponent implements OnInit {
  version = '';

  appTitle = 'Open days with Alexa';

  constructor(private readonly _ipcService: IpcService) {}

  async ngOnInit() {
    this.version = await this._ipcService.query<string>(IpcChannels.common.GET_APP_VERSION);
  }
}
