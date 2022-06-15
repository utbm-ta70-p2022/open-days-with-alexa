import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  appRoutes,
} from '@libraries/lib-common';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { lastValueFrom, Subscription } from 'rxjs';
import { Refresh } from '../store/actions/current-presentation.actions';
import { Update } from '../store/actions/presentation-timer.actions';
import { InformationService } from './information.service';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  subscription: Subscription;
  isCancelled: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _actions$: Actions,
    private readonly _store: Store,
    private readonly _informationService: InformationService
  ) {}

  startTolistenCurrentPresentationChanges(): void {
    this.subscription = this._actions$.pipe(ofActionDispatched(Refresh)).subscribe({
      next: async (refresh: Refresh) => {

        await this.present(refresh.id);
        this.cancel();
      },
    });
  }

  stopTolistenCurrentPresentationChanges() {
    this.subscription.unsubscribe();
  }

  async present(id: string) {
    this.isCancelled = false;
    const informationItem = this._informationService.retrieveOrFail(id);

    this._router.navigate([appRoutes.presentation.root, appRoutes.presentation.information, id]);

    for (let counter = informationItem.displayDurationInSeconds; counter >= 0; counter--) {
      if(this.isCancelled == true){
        console.log("test");
        break;
      }
      await lastValueFrom(this._store.dispatch(new Update(counter)));
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

    }

    this._router.navigate([appRoutes.presentation.root, appRoutes.presentation.waiting]);
  }

  cancel(){
    this.isCancelled = true;
  }
}
