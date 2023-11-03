import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {CounterModel} from "../../shared/store/counter.model";
import {Observable, Subscription} from "rxjs";
import {getCounter} from "../../shared/store/counter.selector";
import {AppStateModel} from "../../shared/store/Global/AppState.model";

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrls: ['./counterdisplay.component.css'],
})
export class CounterdisplayComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppStateModel>) {}


  counterDisplay!: number;
  counterSubscription!: Subscription;
  // counter$ : Observable<CounterModel>;
  ngOnInit(): void {
      this.counterSubscription = this.store.select(getCounter).subscribe((data) => {
      this.counterDisplay = data;
    });

      // this.counter$ = this.store.select('counter')
  }
  ngOnDestroy(): void {
    if(this.counterSubscription){
      this.counterSubscription.unsubscribe();
    }
  }

}
