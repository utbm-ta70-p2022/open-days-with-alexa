import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockUiService {
  private readonly _uiBlocked = new BehaviorSubject<boolean>(false);

  public get $uiBlocked() {
    return this._uiBlocked.asObservable();
  }

  public blockUi() {
    this._uiBlocked.next(true);
  }

  public unBlockUi() {
    this._uiBlocked.next(false);
  }
}
