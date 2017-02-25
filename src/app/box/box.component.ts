import { Component, OnInit, trigger, state, animate, style, transition } from '@angular/core';
import { SwipeService } from "../swipe.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  host: {
    '(document:keyup)': '_keyup($event)',
    '(document:keydown)': '_keydown($event)',
  },
  animations: [
    trigger('movementtigger',[
      state('fp',style({transform: 'translateX(0px)'})),
      state('lp',style({transform: 'translateX(120px)'})),
      transition('fp => lp',[
        animate('1000ms ease-in')
      ]),
      transition('lp => fp',[
        animate('1000ms ease-out')
      ])
    ])
  ]
})
export class BoxComponent implements OnInit {
  rows = [0,1,2,3];
  columns = [0,1,2,3];
  sharedList = [
    4,null,4,4,
    null,null,4,null,
    null,null,null,null,
    null,null,4,8
  ];
  state: string = 'fp';
  constructor(private swipeService: SwipeService){}
  ngOnInit() {
    this.generate();
  }
  generate(){
    console.log('start');
  }
  _keyup(e): void{
    if(e.code == 'ArrowRight'){
      let newList = this.swipeService.swipeRight(this.sharedList);
      this.state = 'lp';
      //здесь устанавливаем анимацию при различных изменениях
      //нужен анализ каждых строк и огромная куча анимаций
      //найти решение для разделения и индификации каждого отдельного спота
      //тянуть анимацию до момента изменения и в конце сделать присвоение
      // this.sharedList = newList;
    }else if(e.code == 'ArrowLeft'){
      let newList = this.swipeService.swipeLeft(this.sharedList);
      this.sharedList = newList;
    }else if(e.code == 'ArrowDown'){
      let newList = this.swipeService.swipeDown(this.sharedList);
      this.sharedList = newList;
    }else if(e.code == 'ArrowUp'){
      let newList = this.swipeService.swipeUp(this.sharedList);
      this.sharedList = newList;
    }

  }
  _keydown(e: Event): void{
    e.preventDefault();
  }

}
