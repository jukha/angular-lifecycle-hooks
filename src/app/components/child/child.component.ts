import { Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {
  private childProp!: number;
  @Input()
  sharedNameProp: any;
  @Input()
  set sharedProp(number: number) {
    this.childProp = number;
  }

  get sharedProp() {
    return this.childProp;
  }

  constructor() { }

  // 1. ngOnChanges is the lifecycle that executeds first.
  // in this case since we are using an input property from the parent. Whenver that property changes in parent this ngOnChanges get invoked
  ngOnChanges(changes: SimpleChanges): void {
    const temp: SimpleChange = changes['sharedProp'];
    debugger;
    // console.log('child ngOnChange', temp);
    console.log('previous val - (ng on changes)', temp.previousValue);
    console.log('current val - (ng on changes)', temp.currentValue);
    this.sharedProp = temp.currentValue;
  }


  // 2.ngOnInit only executes for the first time when component initialzed. Generally used to intialize the variables.
  ngOnInit(): void {
    console.log('child ngOnInit', this.sharedProp);
  }

  // 3. ngDoCheck this get executes when the data (that was passed by reference) gets changed. ngOnChange doesn't execute for such change.
  ngDoCheck(): void {
    console.log(this.sharedNameProp);
  }


}
