import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { StartupComponent } from './startup.component';

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
