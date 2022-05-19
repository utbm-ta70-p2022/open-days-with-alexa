import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes, ImageInformationModel, information, TextInformationModel } from '@libraries/lib-common';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { InformationNotFoundError } from '../errors/information-not-found.error';
import { InformationNotHandledError } from '../errors/information-not-handled.error';
import { Refresh } from '../store/actions/current-presentation.actions';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  subscription: Subscription;

  constructor(private readonly _router: Router, private readonly _actions$: Actions) {}

  startTolistenCurrentPresentationChanges(): void {
    this.subscription = this._actions$.pipe(ofActionDispatched(Refresh)).subscribe({
      next: (refresh: Refresh) => {
        this.present(refresh.id);
      },
    });
  }

  stopTolistenCurrentPresentationChanges() {
    this.subscription.unsubscribe();
  }

  present(id: string) {
    const item = information.find((_) => _.id == id);

    if (!item) {
      throw new InformationNotFoundError();
    }

    if (item instanceof ImageInformationModel) {
      this._router.navigate([appRoutes.presentation.root, appRoutes.presentation.image, id]);
    } else if (item instanceof TextInformationModel) {
      this._router.navigate([appRoutes.presentation.root, appRoutes.presentation.text, id]);
    } else {
      throw new InformationNotHandledError();
    }
  }
}
