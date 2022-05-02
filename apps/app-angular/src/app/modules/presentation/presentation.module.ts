import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { AudioComponent } from './components/audio/audio.component';
import { TextGeneralPresentationComponent } from './components/text-general-presentation/text-general-presentation.component';
import { VideoComponent } from './components/video/video.component';
import { PresentationRoute } from './enumerations/presentation-route.enumeration';
import { Component } from '@angular/core';

@Component({
  template: `
    <a [routerLink]="[audioRoute]">Go to Audio</a>
    <a [routerLink]="[videoVideo]">Go to Video</a>
    <a [routerLink]="[textGeneralPresentationRoute]">Go to Text general presentation</a>
    <router-outlet></router-outlet>
  `,
})
export class PresentationComponent {
  audioRoute = PresentationRoute.Audio;
  videoVideo = PresentationRoute.Video;
  textGeneralPresentationRoute = PresentationRoute.TextGeneralPresentation;
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
            path: PresentationRoute.Video,
            component: VideoComponent,
          },
          {
            path: PresentationRoute.Audio,
            component: AudioComponent,
          },
          {
            path: PresentationRoute.TextGeneralPresentation,
            component: TextGeneralPresentationComponent,
          },
          {
            path: '**',
            redirectTo: PresentationRoute.TextGeneralPresentation,
          },
        ],
      },
    ]),
  ],
})
export class PresentationModule {}
