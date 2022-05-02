import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AudioComponent } from './components/audio/audio.component';
import { TextGeneralPresentationComponent } from './components/text-general-presentation/text-general-presentation.component';
import { VideoComponent } from './components/video/video.component';
import { Component } from '@angular/core';
import { appRoutes } from '@libraries/lib-common';

@Component({
  template: `
    <a [routerLink]="[audioRoute]">Go to Audio</a>
    <a [routerLink]="[videoRoute]">Go to Video</a>
    <a [routerLink]="[textGeneralPresentationRoute]">Go to Text general presentation</a>
    <router-outlet></router-outlet>
  `,
})
export class PresentationComponent {
  audioRoute = appRoutes.presentation.audio;
  videoRoute = appRoutes.presentation.video;
  textGeneralPresentationRoute = appRoutes.presentation.textGeneralPresentation;
}

@NgModule({
  declarations: [PresentationComponent, VideoComponent],
  providers: [PresentationModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PresentationComponent,
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
export class PresentationModule {}
