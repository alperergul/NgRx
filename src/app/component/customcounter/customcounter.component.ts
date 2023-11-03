import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {customincrement} from "../../shared/store/counter.actions";
import {CounterModel} from "../../shared/store/counter.model";
import { Subscription} from "rxjs";
import {getChannelName} from "../../shared/store/counter.selector";

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css']
})
export class CustomcounterComponent implements OnInit{
  constructor(private store: Store<{counter: CounterModel}>) {
  }
  channelName: string = '';
  counterInput: number = 0;
  actionType: string = 'add';
  counterSubscription!: Subscription;

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getChannelName).subscribe(data => {
      this.channelName = data;
      console.log('custom counter')

    })
  }


  OnIncrement() {
    this.store.dispatch(customincrement({value: +this.counterInput, action: this.actionType}));
  }

}
