import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CounterModel} from "./counter.model";

const getCounterState = createFeatureSelector<CounterModel>('counter');

export const getCounter = createSelector(getCounterState, (state: CounterModel) => {
  return state.counter;
})

export const getChannelName = createSelector(getCounterState, (state: CounterModel) => {
  return state.channelName
})
