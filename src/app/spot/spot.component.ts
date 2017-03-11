import { Component, OnChanges, Input, trigger, state, animate, style, transition } from '@angular/core';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css'],
  animations: [
    trigger('movementtigger',[
      state('null',style({transform: 'translateX(0px)'})),
      state('r3',style({transform: 'translateX(360px)'})),
      state('r2',style({transform: 'translateX(240px)'})),
      state('r1',style({transform: 'translateX(120px)'})),
      transition('null => r3',[
        animate('300ms ease-in')
      ]),
      transition('null => r2',[
        animate('200ms ease-in')
      ]),
      transition('null => r1',[
        animate('100ms ease-in')
      ]),
      transition('r3 => null',[
        animate('0ms ease-out')
      ]),
      transition('r2 => null',[
        animate('0ms ease-out')
      ]),
      transition('r1 => null',[
        animate('0ms ease-out')
      ])
    ])
  ]
})
export class SpotComponent implements OnChanges {
  @Input() number: number;
  @Input() anim: string;
  time: number;
  state: String = 'null';
  constructor() { }
  ngOnChanges(): void{
    if(this.anim) this.time = +this.anim.split('')[1]*100;
    this.state = this.anim;
    setTimeout(()=>{this.state = 'null'},this.time);
  }
}
