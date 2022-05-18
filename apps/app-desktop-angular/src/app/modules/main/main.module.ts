<<<<<<< HEAD:apps/app-desktop-angular/src/app/modules/presentation/presentation.module.ts
import { NgModule, Component } from '@angular/core';
=======
import { NgModule, OnInit } from '@angular/core';
>>>>>>> 0fc06ae3ec49c63838da42250a9de03ab396c682:apps/app-desktop-angular/src/app/modules/main/main.module.ts
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { TextGeneralPresentationComponent } from './components/text-general-presentation/text-general-presentation.component';
import { VideoComponent } from './components/video/video.component';
import { appRoutes } from '@libraries/lib-common';
<<<<<<< HEAD:apps/app-desktop-angular/src/app/modules/presentation/presentation.module.ts
import { TextComponent } from './components/text/text.component';

@Component({
  template: `<router-outlet></router-outlet>
=======
import { WebsocketService } from '../../global/services/websocket.service';

@Component({
  template: `
    <p-button label="Test websocket" (click)="testWebsocket()"></p-button>
    <a [routerLink]="[audioRoute]">Go to Audio</a>
>>>>>>> 0fc06ae3ec49c63838da42250a9de03ab396c682:apps/app-desktop-angular/src/app/modules/main/main.module.ts
    <a [routerLink]="[videoRoute]">Go to Video</a>
    <a [routerLink]="[textGeneralPresentationRoute]">Go to Text general presentation</a>
    <a [routerLink]="[textRoute]">Go to Text</a>
  `,
})
<<<<<<< HEAD:apps/app-desktop-angular/src/app/modules/presentation/presentation.module.ts
export class PresentationComponent {
  videoRoute = appRoutes.presentation.video;
  textGeneralPresentationRoute = appRoutes.presentation.textGeneralPresentation;
  textRoute = appRoutes.presentation.text;
=======
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
>>>>>>> 0fc06ae3ec49c63838da42250a9de03ab396c682:apps/app-desktop-angular/src/app/modules/main/main.module.ts
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
            path: appRoutes.presentation.textGeneralPresentation,
            component: TextGeneralPresentationComponent,
          },
          {
            path: appRoutes.presentation.text,
            component: TextComponent,
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
