import { Component } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        maxHeight: 600
      })),
      state('hide',   style({
        maxHeight: 0
      })),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('1000ms 500ms ease-in'))
    ])
  ]
})
export class AppComponent {
  over: boolean = false;
  topScore: boolean = false;
  toggle: boolean = false;

  get stateName(): string{
    return this.toggle ? 'show' : 'hide'
  }
  nextAnimation($event): void{
    // if($event.toState == `hide` && this.toggle == false) {
    //   console.log($event);
    //   this.topScore = false;
    //   this.toggle = true
    // }
  }
  overSwitch($event): void{
    this.over = $event;
    this.toggle = $event;
    console.log(this.toggle);
  }
  recordSwitch($event): void{
    if(!$event) {
      this.toggle = $event;
      setTimeout(()=>{
        this.topScore = false;
        this.toggle = true
      },1000)
    }
    else {
      this.topScore = $event;
    }
  }
  /*
  1 игра все выключено, потом включается topScore
  2 проигрыш, включается over и toggle
  (открывается первое окно с сабмитом)
  3 сабмит, через эмит отключение рекорда, toggle срабатывает и схлопывает все,
  по завершщению онимации topScore отключается и следом опять происходит тогл toggle
   */
}
