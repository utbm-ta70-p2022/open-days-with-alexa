import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { appRoutes } from '@libraries/lib-common';
import { Component, OnInit } from '@angular/core';
import { BlockUiService } from './global/services/block-ui.service';
import { IpcLogService } from './global/services/ipc-log.service';

@Component({
  selector: 'app-root',
  template: `
    <blockablediv class="flex" #blockableDiv>
      <div class="main-frame">
        <router-outlet></router-outlet>
      </div>
    </blockablediv>

    <p-toast key="global-toast" [preventOpenDuplicates]="true"></p-toast>

    <ng-container *ngIf="$uiBlocked | async as uiBlocked">
      <p-blockUI [target]="blockableDiv" [baseZIndex]="50000" [blocked]="uiBlocked">
        <div class="ui-blocker"></div>
      </p-blockUI>
    </ng-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _blockUiService: BlockUiService, private readonly _logService: IpcLogService) {}

  async ngOnInit() {
    this._logService.listen();
  }

  get $uiBlocked() {
    return this._blockUiService.$uiBlocked;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: appRoutes.startup.root,
          loadChildren: () => import('./modules/startup/startup.module').then((m) => m.StartupModule),
        },
        {
          path: appRoutes.presentation.root,
          loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule),
        },
        {
          path: appRoutes.settings.root,
          loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
        },
      ],
      { initialNavigation: 'enabledBlocking', useHash: true }
    ),
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
