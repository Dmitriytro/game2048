import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tutorial-module',
  templateUrl: './tutorial-module.component.html',
  styleUrls: ['./tutorial-module.component.sass']
})
export class TutorialModuleComponent{

  @Output() close = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit(): void{

  }
  closeModal(){
    this.close.emit(false);
  }

}
