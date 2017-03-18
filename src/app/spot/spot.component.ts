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
        animate('3000ms ease-in')
      ]),
      transition('null => r2',[
        animate('2000ms ease-in')
      ]),
      transition('null => r1',[
        animate('1000ms ease-in')
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
  render: number;
  constructor() { }
  ngOnChanges(): void{
    //высчитываем время на полёта элемента до конца и меняем на начало анимации
    if(this.anim !== null) this.time = +this.anim.split('')[1]*1000;
    this.state = this.anim;
    setTimeout(()=>{
      //по завершению времени переводим эл-нт в состояние пустито и отображаем новое значение ячейки
      this.render = this.number;
      this.state = 'null';
    },this.time);
  }
  //мне нужно передавать значения Слияния и времени через сколько создавать слияние
  //+ сделать анимацию появления новых элементов
}
