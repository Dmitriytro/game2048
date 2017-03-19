import { Component, OnChanges, Input, trigger, state, animate, style, transition } from '@angular/core';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css'],
  animations: [
    trigger('movementtigger',[
      state('null',style({transform: 'translateX(0px)'})),
      state('r3',style({transform: 'translateX(280px)'})),
      state('r2',style({transform: 'translateX(200px)'})),
      state('r1',style({transform: 'translateX(40px)'})),
      state('l3',style({transform: 'translateX(-280px)'})),
      state('l2',style({transform: 'translateX(-200px)'})),
      state('l1',style({transform: 'translateX(-40px)'})),
      state('d3',style({transform: 'translateY(280px)'})),
      state('d2',style({transform: 'translateY(200px)'})),
      state('d1',style({transform: 'translateY(40px)'})),
      state('t3',style({transform: 'translateY(-280px)'})),
      state('t2',style({transform: 'translateY(-200px)'})),
      state('t1',style({transform: 'translateY(-40px)'})),
      transition('null => r3',[animate('300ms ease-in')]),
      transition('null => r2',[animate('300ms ease-in')]),
      transition('null => r1',[animate('300ms ease-in')]),
      transition('null => l3',[animate('300ms ease-in')]),
      transition('null => l2',[animate('300ms ease-in')]),
      transition('null => l1',[animate('300ms ease-in')]),
      transition('null => d3',[animate('300ms ease-in')]),
      transition('null => d2',[animate('300ms ease-in')]),
      transition('null => d1',[animate('300ms ease-in')]),
      transition('null => t3',[animate('300ms ease-in')]),
      transition('null => t2',[animate('300ms ease-in')]),
      transition('null => t1',[animate('300ms ease-in')]),
      transition('r3 => null',[animate('0ms ease-out')]),
      transition('r2 => null',[animate('0ms ease-out')]),
      transition('r1 => null',[animate('0ms ease-out')]),
      transition('l3 => null',[animate('0ms ease-out')]),
      transition('l2 => null',[animate('0ms ease-out')]),
      transition('l1 => null',[animate('0ms ease-out')]),
      transition('d3 => null',[animate('0ms ease-out')]),
      transition('d2 => null',[animate('0ms ease-out')]),
      transition('d1 => null',[animate('0ms ease-out')]),
      transition('t3 => null',[animate('0ms ease-out')]),
      transition('t2 => null',[animate('0ms ease-out')]),
      transition('t1 => null',[animate('0ms ease-out')])
    ]),
    trigger('compactiontigger',[
      state('null',style({transform: 'scale(1)'})),
      state('compaction',style({transform: 'scale(1.2)'})),
      transition('compaction => null',[animate('100ms ease-in')])
    ])
  ]
})
export class SpotComponent implements OnChanges {
  @Input() number: number;
  @Input() anim: string;
  @Input() compaction: any;
  time: number = 300;
  state: String = 'null';
  state2: String = 'null';
  render: number;
  constructor() { }
  ngOnChanges(): void{
    if(this.anim) {
      setTimeout(()=>{
        this.render = this.number;
      },this.time);
      this.state = this.anim;
    }
    if(this.compaction !== 'null'){
      setTimeout(()=>{
        this.state2 = 'compaction';
        this.render = this.number;
        setTimeout(()=>{
          this.state2 = 'null';
        },1);
      },this.time);
    }
  }
}
