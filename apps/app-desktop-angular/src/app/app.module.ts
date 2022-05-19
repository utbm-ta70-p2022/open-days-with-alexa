import { NgModule, Component, OnInit, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { appRoutes } from '@libraries/lib-common';
import { BlockUiService } from './global/services/block-ui.service';
import { WebsocketService } from './global/services/websocket.service';
import { CurrentPresentationState } from './global/store/states/current-presentation.state';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { PresentationService } from './global/services/presentation.service';
import { ToastMessageService } from './global/services/toast-message.service';
import { ErrorsHandler } from './global/handlers/errors.handler';

const states = [CurrentPresentationState];

export function createErrorsHandler(
  toastMessageService: ToastMessageService,
) {
  return new ErrorsHandler(toastMessageService);
}

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
export class AppComponent {
  constructor(private readonly _blockUiService: BlockUiService) {}

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
          loadChildren: () => import('./modules/startup/startup.module').then((_) => _.StartupModule),
        },
        {
          path: appRoutes.presentation.root,
          loadChildren: () => import('./modules/presentation/presentation.module').then((_) => _.PresentationModule),
        },
        {
          path: '**',
          redirectTo: appRoutes.presentation.root,
        },
      ],
      { initialNavigation: 'enabledBlocking', useHash: true }
    ),
    SharedModule,
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
   
  ],
  providers: [
     {
      provide: ErrorHandler,
      useFactory: createErrorsHandler,
      deps: [ToastMessageService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
