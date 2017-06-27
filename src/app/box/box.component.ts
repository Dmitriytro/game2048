import { Component, OnInit} from '@angular/core';
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
  rows = [];
  columns = [];
  sharedList = [];
  lastSharedList = [];
  animationList = [];
  compactionList = [];
  animationDone = true;
  constructor(
    private swipeService: SwipeService
  ){}
  ngOnInit() {
    this.generate();
    const times = n => f => {
      let iter = i => {
        if (i === n) return;
        f (i);
        iter (i + 1)
      };
      return iter (0)
    };
    times(4) ((i)=> {
      this.rows.push(i);
      this.columns.push(i);
      times(4) (()=> {
        this.animationList.push('null');
        this.compactionList.push('null');
        this.sharedList.push(null);
      });
      this.sharedList = this._extention(this.sharedList);
    });
  }
  generate(){
    console.log('start');
  }

  _keyup(e): void{
    if(this.animationDone) {
      let result = [];
      this.animationDone = !this.animationDone;
      if(e.code == 'ArrowRight') result = this.swipeService.swipeRight(this.sharedList);
      else if(e.code == 'ArrowLeft') result = this.swipeService.swipeLeft(this.sharedList);
      else if(e.code == 'ArrowDown') result = this.swipeService.swipeDown(this.sharedList);
      else if(e.code == 'ArrowUp') result = this.swipeService.swipeUp(this.sharedList);
      this._resultHandling(result);
      setTimeout(()=>{this.animationDone = !this.animationDone},100);
    }
  }
  _keydown(e: Event): void{
    e.preventDefault();
  }
  _resultHandling(result: Array<Array<number>>): void{
    this.animationList = result[1];
    this.compactionList = result[2];
    if(this.lastSharedList.toString() !== result[0].toString()) this.sharedList = this._extention(result[0]);
    this.lastSharedList = this.sharedList;
  }
  _extention(array: Array<number>): Array<number>{
    let nulls = [];
    for(let i in array){
      if(array[i]==null) nulls.push(i);
    }
    let numOfNull = nulls[Math.floor(Math.random()*nulls.length)];
    if(Math.random()>0.7) array[numOfNull] = 4;
    else array[numOfNull] = 2;
    return array
  }
}
