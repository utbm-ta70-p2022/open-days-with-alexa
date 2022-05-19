import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Update } from '../actions/presentation-timer.actions';

@State<number>({
  name: 'PresentationTime',
  defaults: 0,
})
@Injectable()
export class PresentationTimerState {
  @Action(Update)
  increase(context: StateContext<number>, action: Update) {
    context.setState(action.counter);
  }
}
