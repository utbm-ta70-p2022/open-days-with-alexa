import { NgModule, Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { TextComponent } from './components/text/text.component';
import { VideoComponent } from './components/video/video.component';
import { appRoutes } from '@libraries/lib-common';
import { AudioComponent } from './components/audio/audio.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { WebsocketService } from '../../global/services/websocket.service';
import { PresentationService } from '../../global/services/presentation.service';
import { ImageComponent } from './components/image/image.component';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class PresentationComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _websocketService: WebsocketService,
    private readonly _presentationService: PresentationService
  ) {}

  async ngOnInit() {
    this._presentationService.startTolistenCurrentPresentationChanges();
    await this._websocketService.connect();
  }

  ngOnDestroy() {
    this._presentationService.stopTolistenCurrentPresentationChanges();
  }
}

@NgModule({
  declarations: [PresentationComponent, AudioComponent, TextComponent, VideoComponent, WaitingComponent],
  providers: [PresentationModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PresentationComponent,
        children: [
          {
            path: `${appRoutes.presentation.audio}/:id`,
            component: AudioComponent,
          },
          {
            path: `${appRoutes.presentation.image}/:id`,
            component: ImageComponent,
          },
          {
            path: `${appRoutes.presentation.text}/:id`,
            component: TextComponent,
          },
          {
            path: `${appRoutes.presentation.video}/:id`,
            component: VideoComponent,
          },
          {
            path: appRoutes.presentation.waiting,
            component: WaitingComponent,
          },
          {
            path: '**',
            redirectTo: appRoutes.presentation.waiting,
          },
        ],
      },
    ]),
  ],
})
export class PresentationModule {}
