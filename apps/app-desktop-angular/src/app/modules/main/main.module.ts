import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AudioComponent } from './components/audio/audio.component';
import { TextGeneralPresentationComponent } from './components/text-general-presentation/text-general-presentation.component';
import { VideoComponent } from './components/video/video.component';
import { Component } from '@angular/core';
import { appRoutes } from '@libraries/lib-common';
import { WebsocketService } from '../../global/services/websocket.service';

@Component({
  template: `
    <p-button label="Test websocket" (click)="testWebsocket()"></p-button>
    <a [routerLink]="[audioRoute]">Go to Audio</a>
    <a [routerLink]="[videoRoute]">Go to Video</a>
    <a [routerLink]="[textGeneralPresentationRoute]">Go to Text general presentation</a>
    <router-outlet></router-outlet>
  `,
})
export class MainComponent implements OnInit {
  audioRoute = appRoutes.presentation.audio;
  videoRoute = appRoutes.presentation.video;
  textGeneralPresentationRoute = appRoutes.presentation.textGeneralPresentation;

  constructor(private readonly _websocketService: WebsocketService) {}

  ngOnInit(): void {
    this._websocketService.connect();
  }

  testWebsocket() {
    this._websocketService.test();
  }
}

@NgModule({
  declarations: [MainComponent, VideoComponent],
  providers: [MainModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: appRoutes.presentation.video,
            component: VideoComponent,
          },
          {
            path: appRoutes.presentation.audio,
            component: AudioComponent,
          },
          {
            path: appRoutes.presentation.textGeneralPresentation,
            component: TextGeneralPresentationComponent,
          },
          {
            path: '**',
            redirectTo: appRoutes.presentation.textGeneralPresentation,
          },
        ],
      },
    ]),
  ],
})
export class MainModule {}
