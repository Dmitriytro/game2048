import { Component, OnInit } from '@angular/core';
import { SwipeService } from "../swipe.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  host: {
    '(document:keyup)': '_keyup($event)',
    '(document:keydown)': '_keydown($event)',
  }
})
export class BoxComponent implements OnInit {
  rows = [0,1,2,3];
  columns = [0,1,2,3];
  sharedList = [
    4,null,4,4,
    null,null,null,null,
    null,null,2,null,
    null,null,null,8
  ];
  constructor(private swipeService: SwipeService){}
  ngOnInit() {
    this.generate();
  }
  generate(){
    console.log('start');
  }
  _keyup(e): void{
    if(e.code == 'ArrowRight'){
      this.sharedList = this.swipeService.swipeRight(this.sharedList);
    }else if(e.code == 'ArrowLeft'){
      this.sharedList = this.swipeService.swipeLeft(this.sharedList);
    }else if(e.code == 'ArrowDown'){
      this.sharedList = this.swipeService.swipeDown(this.sharedList);
    }else if(e.code == 'ArrowUp'){
      this.sharedList = this.swipeService.swipeUp(this.sharedList);
    }

  }
  _keydown(e: Event): void{
    e.preventDefault();
  }

}
