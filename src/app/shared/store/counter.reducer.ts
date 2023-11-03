import { createReducer, on } from '@ngrx/store';
import {changeChannelName, customincrement, decrement, increment, reset} from './counter.actions';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: initialState.counter,
    };
  }),
  on(customincrement, (state, action) => {
    return {
      ...state,
      counter: action.action === 'add' ? state.counter + action.value: state.counter - action.value
    }
  }),
  on(changeChannelName, (state, action) => {
    return {
      ...state,
      channelName: action.channel
    }
  })
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
