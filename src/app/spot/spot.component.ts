import { Component, OnChanges, Input} from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations'

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css'],
  animations: [
    trigger('movementtrigger',[
      state('null',style({transform: 'translateX(0px)'})),
      state('r3',style({transform: 'translateX(360px)'})),
      state('r2',style({transform: 'translateX(240px)'})),
      state('r1',style({transform: 'translateX(120px)'})),
      state('l3',style({transform: 'translateX(-360px)'})),
      state('l2',style({transform: 'translateX(-240px)'})),
      state('l1',style({transform: 'translateX(-120px)'})),
      state('d3',style({transform: 'translateY(360px)'})),
      state('d2',style({transform: 'translateY(240px)'})),
      state('d1',style({transform: 'translateY(120px)'})),
      state('t3',style({transform: 'translateY(-360px)'})),
      state('t2',style({transform: 'translateY(-240px)'})),
      state('t1',style({transform: 'translateY(-120px)'})),
      // transition('null => r3',[animate('100ms ease-in')]),
      // transition('null => r2',[animate('100ms ease-in')]),
      // transition('null => r1',[animate('100ms ease-in')]),
      // transition('null => l3',[animate('100ms ease-in')]),
      // transition('null => l2',[animate('100ms ease-in')]),
      // transition('null => l1',[animate('100ms ease-in')]),
      // transition('null => d3',[animate('100ms ease-in')]),
      // transition('null => d2',[animate('100ms ease-in')]),
      // transition('null => d1',[animate('100ms ease-in')]),
      // transition('null => t3',[animate('100ms ease-in')]),
      // transition('null => t2',[animate('100ms ease-in')]),
      transition('null => *',[animate('100ms ease-in')]),
      transition('* => null',[animate('0ms ease-out')])
      // transition('r2 => null',[animate('0ms ease-out')]),
      // transition('r1 => null',[animate('0ms ease-out')]),
      // transition('l3 => null',[animate('0ms ease-out')]),
      // transition('l2 => null',[animate('0ms ease-out')]),
      // transition('l1 => null',[animate('0ms ease-out')]),
      // transition('d3 => null',[animate('0ms ease-out')]),
      // transition('d2 => null',[animate('0ms ease-out')]),
      // transition('d1 => null',[animate('0ms ease-out')]),
      // transition('t3 => null',[animate('0ms ease-out')]),
      // transition('t2 => null',[animate('0ms ease-out')]),
      // transition('t1 => null',[animate('0ms ease-out')])
    ]),
    trigger('compactiontrigger',[
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
  scheme: Array<string> = ['#78909C','#455A64','#263238',
    '#00695C','#009688','#43A047','#689F38','#827717',
    '#EF6C00','#BF360C','#FF9800','#8BC34A','#FFEB3B',
    '#CDDC39','#009688','#00BCD4'];
  bgColor: string = 'none';
  size: string = '56px';
  time: number = 100;
  state: String = 'null';
  state2: String = 'null';
  render: number;
  constructor() {}
  ngOnChanges(): void{
    if(this.anim) {
      setTimeout(()=>{
        this.render = this.number;
        this.state = 'null';
        this._schemeSwitch(this.number);
      },this.time);
      this.state = this.anim;
    }
    if(this.compaction !== 'null' && this.compaction !== 1){
      setTimeout(()=>{
        this.state2 = 'compaction';
        this.render = this.number;
        this._schemeSwitch(this.number);
        setTimeout(()=>{
          this.state2 = 'null';
        },1);
      },this.time);
    } else if(this.compaction == 1){
      setTimeout(()=>{
        this.render = this.number;
        this._schemeSwitch(this.number);
      },this.time);
    }
  }
  _schemeSwitch(number: number): void {
    let arrNum = this._binarySeq(number);
    this.bgColor = this.scheme[arrNum]
  }
  _binarySeq(value: number): number{
    let count = -1;
    while(value > 1) {
      value /= 2;
      count++;
    }
    if(count>10){this.size = '44px';}
    count = count % this.scheme.length;
    return count;
  }
}
