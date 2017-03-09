import { Component, OnChanges, Input, trigger, state, animate, style, transition } from '@angular/core';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css'],
  animations: [
    trigger('movementtigger',[
      state('null',style({transform: 'translateX(0px)'})),
      state('r3',style({transform: 'translateX(120px)'})),
      transition('null => r3',[
        animate('1000ms ease-in')
      ]),
      transition('r3 => null',[
        animate('1000ms ease-out')
      ])
    ])
  ]
})
export class SpotComponent implements OnChanges {
  @Input() number: Number;
  @Input() anim: String;
  state: String = 'null';
  constructor() { }
  ngOnChanges(): void{
    this.state = this.anim;
  }
}
