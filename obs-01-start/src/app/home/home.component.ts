import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter} from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000)//for every sec a new observable will be emitted
    // .subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );
    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);//observer.error(), observer.complete()
        if(count === 2) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Counter greater than 3!'));
        }
        count++;
      }, 1000)
    });

    

    //subscribe that custom created observable
    this.firstObsSubscription = customObservable.pipe(filter( data => {
      return data > 0;// it will return boolean based on condition, based on this next method execution takes place.
    }), map(
      (data: number) => {
      //customize the data format which you needed.
      return 'Round ' + (data + 1);
    })).subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, ()=> {
      console.log('Counter completed!');
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
