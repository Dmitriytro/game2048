import { Component } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        maxHeight: 600
      })),
      state('hide', style({
        maxHeight: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms 500ms ease-in'))
    ])
  ]
})
export class AppComponent {
  over: boolean = false;
  topScore: boolean = false;
  toggle: boolean = false;
  modal: boolean = false;
  hint: boolean = false;

  _closeModal(): void{
    this.modal = false;
    this.hint = false;
  }
  modalPop(): void{
    this.modal = true;
    this.hint = true;
  }
  get stateName(): string{
    return this.toggle ? 'show' : 'hide'
  }
  nextAnimation($event): void{
    if($event.toState == `hide` && $event.fromState != `void`) {
      if (this.topScore) {
        this.topScore = false;
        setTimeout(()=>{this._boardShow()},0)
      }
      else this.over = false;
    }
  }
  overSwitch($event): void{
    if($event && this.topScore){
      this._submitShow();
    } else if($event && !this.topScore){
      this._boardShow();
    } else {
      this._boardHide();
    }
  }
  recordSwitch($event): void{
    if(this.over && !$event){
      this._submitHide();
    } else this.topScore = $event;
  }
  _submitShow(): void {
    this.over = true;
    this.toggle = true;
  }
  _boardShow(): void {
    this.over = true;
    this.toggle = true;
  }
  _submitHide(): void {
    this.toggle = false;
  }
  _boardHide(): void {
    this.toggle = false;
  }
}
