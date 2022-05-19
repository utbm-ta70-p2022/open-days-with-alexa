import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Update } from '../actions/server-status.actions';

@State<boolean>({
  name: 'ServerStatus',
  defaults: false,
})
@Injectable()
export class ServerStatusState {
  @Action(Update)
  increase(context: StateContext<boolean>, action: Update) {
    context.setState(action.connected);
  }
}
