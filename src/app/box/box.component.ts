import { Component, OnInit} from '@angular/core';
import { SwipeService } from "../swipe.service";
import { AnimationService } from "../animation.service";

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
    8,4,null,4,
    2,null,null,null,
    null,null,null,4,
    2,2,4,16
  ];
  animationList = [
    'null','null','null','null',
    'null','null','null','null',
    'null','null','null','null',
    'null','null','null','null'
  ];
  compactionList = [
    'null','null','null','null',
    'null','null','null','null',
    'null','null','null','null',
    'null','null','null','null'
  ];
  constructor(
    private swipeService: SwipeService,
    private animationService: AnimationService
  ){}
  ngOnInit() {
    this.generate();
  }
  generate(){
    console.log('start');
  }
  _keyup(e): void{
    if(e.code == 'ArrowRight'){
      let result = this.swipeService.swipeRight(this.sharedList);
      this._resultHandling(result);
    }else if(e.code == 'ArrowLeft'){
      let result = this.swipeService.swipeLeft(this.sharedList);
      this._resultHandling(result);
    }else if(e.code == 'ArrowDown'){
      let result = this.swipeService.swipeDown(this.sharedList);
      this._resultHandling(result);
    }else if(e.code == 'ArrowUp'){
      let result = this.swipeService.swipeUp(this.sharedList);
      this._resultHandling(result);
    }
  }
  _keydown(e: Event): void{
    e.preventDefault();
  }
  _resultHandling(result): void{
    this.animationList = result[1];
    this.compactionList = result[2];
    this.sharedList = this._extention(result[0]);
  }
  _extention(array: Array<number>): Array<number>{
    let nulls = [];
    for(let i in array){
      if(array[i]==null) nulls.push(i);
    }
    let numOfNull = nulls[Math.floor(Math.random()*nulls.length)];
    array[numOfNull] = 2;
    return array
  }
}
