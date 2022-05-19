import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Refresh } from '../actions/current-presentation.actions';

@State<string>({
  name: 'CurrentPresentation',
  defaults: ''  ,
})
@Injectable()
export class CurrentPresentationState {
  @Action(Refresh)
  refresh(context: StateContext<string>, action: Refresh) {
    context.setState(action.id);
  }
}
