import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { LauncherComponent } from './launcher.component';

@NgModule({
  declarations: [LauncherComponent],
  providers: [LauncherModule],
  imports: [SharedModule],
})
export class LauncherModule {}
