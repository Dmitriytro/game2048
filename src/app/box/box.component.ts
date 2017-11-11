import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { SwipeService } from "../swipe.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.sass'],
  host: {
    '(document:keyup)': '_keyup($event)',
    '(document:keydown)': '_keydown($event)',
  }
})
export class BoxComponent implements OnInit {
  @Output() ladderSwitcher = new EventEmitter<boolean>();
  @Input() topScore: boolean;
  @Input() hint: boolean = false;
  rows = [];
  columns = [];
  sharedList = [];
  lastSharedList = [];
  animationList = [];
  compactionList = [];
  animationDone = true;
  over = false;
  restartStreamSubs: Subscription;
  loadSub: Subscription;
  constructor(
    private swipeService: SwipeService
  ){}
  ngOnInit() {
    this.start();
    this.restartStreamSubs = this.swipeService.restartStream$.subscribe(()=>this.restart());
    this.loadSub = this.swipeService.loadProgressStream$.subscribe((res)=>{
      this.sharedList = res;
      this._lossCheck(this.sharedList);
      // setTimeout(()=>{this.ladderSwitcher.emit(true)},0);
    });
  }
  ngOnDestroy(): void{
    this.restartStreamSubs.unsubscribe();
    this.loadSub.unsubscribe();
  }
  start(): void{
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
  restart(): void{
    // if(!this.topScore){
      this.over = false;
      this.ladderSwitcher.emit(this.over);
      this.rows = [];
      this.columns = [];
      this.sharedList = [];
      this.lastSharedList = [];
      this.animationList = [];
      this.compactionList = [];
      this.start();
      this.swipeService.restartScore();
      this.swipeService.sendProgress(this.sharedList);
    // }
  }
  _keyup(e): void{
    if(e.code.indexOf('Arrow')>=0 && this.animationDone && !this.over && !this.hint) {
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
    if(!this.over){
      e.preventDefault();
    }
  }
  _resultHandling(result: Array<Array<number>>): void{
    this.animationList = result[1];
    this.compactionList = result[2];
    if(this.lastSharedList.toString() !== result[0].toString()) this.sharedList = this._extention(result[0]);
    this.lastSharedList = this.sharedList;
    this.swipeService.sendProgress(this.sharedList);
    this._lossCheck(this.sharedList);
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
  _lossCheck(array: Array<number>): void{
    if(array.filter(elem => elem == null).length == 0) {
      this.over = this.swipeService.optionCheck(array);
      this.ladderSwitcher.emit(this.over);
    }
  }
}
