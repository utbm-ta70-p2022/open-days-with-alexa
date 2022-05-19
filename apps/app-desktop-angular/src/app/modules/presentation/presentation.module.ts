import { NgModule, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { TextComponent } from './components/text/text.component';
import { VideoComponent } from './components/video/video.component';
import { appRoutes } from '@libraries/lib-common';
import { WebsocketService } from '../../global/services/websocket.service';
import { AudioComponent } from './components/audio/audio.component';
import { WaitingComponent } from './components/waiting/waiting.component';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class PresentationComponent implements OnInit {
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
  declarations: [PresentationComponent, AudioComponent, TextComponent, VideoComponent, WaitingComponent],
  providers: [PresentationModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: PresentationComponent,
      },
      {
        path: '**',
        component: WaitingComponent,
      },
    ]),
  ],
})
export class PresentationModule {}
