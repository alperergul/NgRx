import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  changeChannelName,
  decrement,
  increment,
  reset,
} from 'src/app/shared/store/counter.actions';
import {AppStateModel} from "../../shared/store/Global/AppState.model";

@Component({
  selector: 'app-counterbutton',
  templateUrl: './counterbutton.component.html',
  styleUrls: ['./counterbutton.component.css'],
})
export class CounterbuttonComponent {
  constructor(private store: Store<AppStateModel>) {}

  OnIncrement() {
    this.store.dispatch(increment());
  }

  OnDecrement() {
    this.store.dispatch(decrement());
  }

  OnReset() {
    this.store.dispatch(reset());
  }

  OnRename(){
    this.store.dispatch(changeChannelName({channel: 'Welcome to test channel!'}));
  }
}
