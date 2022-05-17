import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { TextGeneralPresentationComponent } from './components/text-general-presentation/text-general-presentation.component';
import { VideoComponent } from './components/video/video.component';
import { appRoutes } from '@libraries/lib-common';
import { TextComponent } from './components/text/text.component';

@Component({
  template: `<router-outlet></router-outlet>
    <a [routerLink]="[videoRoute]">Go to Video</a>
    <a [routerLink]="[textGeneralPresentationRoute]">Go to Text general presentation</a>
    <a [routerLink]="[textRoute]">Go to Text</a>
  `,
})
export class PresentationComponent {
  videoRoute = appRoutes.presentation.video;
  textGeneralPresentationRoute = appRoutes.presentation.textGeneralPresentation;
  textRoute = appRoutes.presentation.text;
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
export class PresentationModule {}
