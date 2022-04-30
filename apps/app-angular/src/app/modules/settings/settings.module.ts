import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ProxySettingsComponent } from './components/proxy-settings/proxy-settings.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent, ProxySettingsComponent],
  providers: [SettingsModule],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class SettingsModule {}
