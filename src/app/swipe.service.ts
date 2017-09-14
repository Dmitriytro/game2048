import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from "rxjs";


@Injectable()
export class SwipeService {
  @Output() score: EventEmitter<number> = new EventEmitter();
  private _zeroingOutSource = new BehaviorSubject<number>(0);
  constructor() {}
  scoreIncrease(): EventEmitter<number>{
    return this.score;
  }
  zeroingOuter$ = this._zeroingOutSource.asObservable();
  restartScore(): void{
    this._zeroingOutSource.next(0);
  }

  optionCheck(array: Array<number>): boolean{
    let rows = this._cutRow(array.slice());
    let column = this._cutColumn(array.slice());
    rows = this._doubleNearby(rows);
    rows = this._nullFilter(rows);
    column = this._doubleNearby(column);
    column = this._nullFilter(column);
    let lines = column.concat(rows);
    return lines.every(elem => elem.length == 4);
  }
  swipeRight(list: Array<number>): Array<Array<any>>{
    let animation = list.slice(); //copy list to animation
    let animationArr = this._cutRow(animation); // cut animation to lines
    let lines = this._cutRowReverse(list); //and cut list, with reverse
    animationArr = this._countionFA(animationArr,'swipeRight'); //fill fly-way up
    animationArr = this._countionSA(animationArr,lines,'swipeRight'); //plus extra merge way
    let mergeArr = this._countionMerge(animationArr,'swipeRight'); //founding merge places
    lines = this._doubleNearby(lines); //lines doubling
    lines = this._nullFilter(lines); //cut nulls
    lines = this._reverse(lines); //reverse
    lines = this._fillMissingUp(lines,'swipeRight'); //filling to 4
    list = this._concatination(lines); //transformed to list
    let mergeList = this._concatination(mergeArr); //to merge list
    let animationList = this._concatination(animationArr); //to anim list
    let animationListStr = this._animationRemodel(animationList,'swipeRight'); //to string triggers
    return [list,animationListStr,mergeList];
  }
  swipeLeft(list: Array<number>): Array<Array<any>>{
    let animation = list.slice(); //copy list to animation
    let animationArr = this._cutRow(animation); // cut animation to lines
    let lines = this._cutRow(list); //and cut list
    animationArr = this._countionFA(animationArr,'swipeLeft'); //fill fly-way up
    animationArr = this._countionSA(animationArr,lines,'swipeLeft'); //plus extra merge way
    let mergeArr = this._countionMerge(animationArr,'swipeLeft'); //founding merge places
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._nullFilter(lines);
    lines = this._fillMissingUp(lines,'swipeLeft');
    list = this._concatination(lines);
    let mergeList = this._concatination(mergeArr); //to merge list
    let animationList = this._concatination(animationArr); //to anim list
    let animationListStr = this._animationRemodel(animationList,'swipeLeft'); //to string triggers
    return [list,animationListStr,mergeList];
  }
  swipeDown(list: Array<number>): Array<Array<any>>{
    let animation = list.slice(); //copy list to animation
    let animationArr = this._cutColumn(animation); // cut animation to lines
    let lines = this._cutColumn(list); // cut column
    animationArr = this._countionFA(animationArr,'swipeRight'); //fill fly-way up
    lines = this._reverse(lines); //reverse
    animationArr = this._countionSA(animationArr,lines,'swipeRight'); //plus extra merge way
    lines = this._reverse(lines); //reverse
    let mergeArr = this._countionMerge(animationArr,'swipeRight'); //founding merge places
    lines = this._nullFilter(lines); //cut nulls
    lines = this._reverse(lines);
    lines = this._doubleNearby(lines); //lines doubling
    lines = this._nullFilter(lines); //cut nulls
    lines = this._reverse(lines); //reverse
    lines = this._fillMissingUp(lines,'swipeRight'); //filling to 4
    list = this._remodel(lines);  //transformed to list
    let mergeList = this._remodel(mergeArr); //to merge list
    let animationList = this._remodel(animationArr); //to anim list
    let animationListStr = this._animationRemodel(animationList,'swipeDown'); //to string triggers
    return [list,animationListStr,mergeList];
  }
  swipeUp(list: Array<number>): Array<Array<any>>{
    let animation = list.slice(); //copy list to animation
    let animationArr = this._cutColumn(animation); // cut animation to lines
    let lines = this._cutColumn(list); //and cut list
    animationArr = this._countionFA(animationArr,'swipeLeft'); //fill fly-way up
    animationArr = this._countionSA(animationArr,lines,'swipeLeft'); //plus extra merge way
    let mergeArr = this._countionMerge(animationArr,'swipeLeft'); //founding merge places
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._nullFilter(lines);
    lines = this._fillMissingUp(lines,'swipeLeft');
    list = this._remodel(lines);
    let mergeList = this._remodel(mergeArr); //to merge list
    let animationList = this._remodel(animationArr); //to anim list
    let animationListStr = this._animationRemodel(animationList,'swipeUp'); //to string triggers
    return [list,animationListStr,mergeList];
  }
  _cutRow(list: Array<number>): Array<Array<number>>{
    let newArr = [];
    let length = Math.sqrt(list.length);
    const chopper = (list,length,newArr)=>{
      let part = list.splice(0,length); //cut the part
      if(part.length>0) { //check if this something
        newArr.push(part); //then add part
      }
      if(newArr.length == length) return newArr; //is it final length?
      else return chopper(list,length,newArr); //or need to conti
    };
    return chopper(list.slice(),length,newArr);
  }
  _cutRowReverse(list: Array<number>): Array<Array<number>>{
    let rows = this._cutRow(list);
    for (let arr of rows){
      arr = arr.reverse()
    }
    return rows
  }
  _cutColumn(list: Array<number>): Array<Array<number>>{
    let newArrays = [];
    let lines = this._cutRow(list);
    for(let i = 0;i<4;i++){
      let arr = [];
      for(let line of lines){
        arr.push(line[i])
      }
      newArrays.push(arr);
    }
    return newArrays
  }
  _countionFA(arrays: Array<Array<number>>,direction: String): Array<Array<number>>{
    let newArrays = [];
    for(let array of arrays){
      if(direction == 'swipeRight') array = array.reverse();
      //reversing all the lines
      let newA = []; // new empty arr
      let numCounter = 0; // filled spots
      array.forEach((elem,i)=>{
        //if elem is empty, we need to put it in new arr
        if(elem == null) newA[i] = null;
        else {
          //else fly all the way down without filled spots
          newA[i] = i-numCounter;
          numCounter++;
        }
      });
      if(direction == 'swipeRight') newArrays.push(newA.reverse()); // return new animation arr with reverse lines back
      else newArrays.push(newA);
    }
    return newArrays
  }
  _countionSA(aniArrays: Array<Array<number>>,listArr: Array<Array<number>>,direction: String): Array<Array<number>>{
    let newArrays = [];
    for(let i in aniArrays){
      let currentLine = listArr[i].slice(); //copy each line
      let result = aniArrays[i];
      if(direction == 'swipeRight') {
        result = result.reverse();
        // currentLine = currentLine.reverse();
      }
      let pass = false; //trigger
      result.forEach((elem,idx,arr)=>{ //looking for the same values
        // console.log(arr.slice());
        // console.log(currentLine.slice());
        if(!pass){ //if trigger is off
          if(currentLine[idx] !== null){ //elem is not empty
            if(
              (currentLine[idx] == currentLine[+idx+1]) ||
              (currentLine[idx] == currentLine[+idx+2] && currentLine[+idx+1] == null) ||
              (currentLine[idx] == currentLine[+idx+3] && currentLine[+idx+1] == null && currentLine[+idx+2] == null)
            ){ //current and next the same or null between
              let front = currentLine.length-1-idx; //how many spots left in the front
              for(let j = 0;j<front;j++){
                if(currentLine[+idx+1+j] !== null){ //not empty --> plus 1 for merge
                  arr[+idx+1+j]++;
                }
              }
              pass = true; //turn trigger on, to pass value if it's same again
            }
          }
        } else {
          if(currentLine[idx] !== null) pass = false;
        }
      });
      if(direction == 'swipeRight') {
        result = result.reverse();
        // currentLine = currentLine.reverse();
      }
      newArrays.push(result); //result: plus extra merge way
    }
    return newArrays
  }
  _countionMerge(aniArrays: Array<Array<number>>,direction: String): Array<Array<any>>{
    let newArrays = [];
    aniArrays.forEach((arr)=>{
      let concatArr = [null,null,null,null];
      arr.forEach((elem,i)=>{
        if((elem ^ 0) === elem) { //if elem is num
          if (direction == 'swipeRight'){
            if(concatArr[elem+i] === null) concatArr[elem+i] = 1; //num on this spot
            else if(concatArr[elem+i] === 1) concatArr[elem+i] = true; //second num on the spot means merge
          }
          else{
            if(concatArr[+i-elem] === null) concatArr[+i-elem] = 1; //num on this spot
            else if(concatArr[+i-elem] === 1) concatArr[+i-elem] = true; //second num on the spot means merge
          }
        }
      });
      newArrays.push(concatArr);
    });
    return newArrays
  }
  _animationRemodel(array: Array<number>,kind: string): Array<string>{
    let newArrays = [];
    let extension: any;
    if(kind == 'swipeRight') extension = 'r';
    else if(kind == 'swipeLeft') extension = 'l';
    else if(kind == 'swipeDown') extension = 'd';
    else if(kind == 'swipeUp') extension = 't';
    for(let elem of array){
      if(elem!==null){
        if(elem == 0) elem = null;
        else elem = extension+elem;
      }
      newArrays.push(elem);
    }
    return newArrays
  }
  _nullFilter(arrays: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    for(let array of arrays){
      newArrays.push(array.filter(elem => elem !== null));
    }
    return newArrays
  }
  _doubleNearby(arrays: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    for(let array of arrays){
      newArrays.push(
        this._checkNearby(array)
      );
    }
    return newArrays
  }
  _checkNearby(arr: Array<number>): Array<number>{
    let newArr = [];
    for (let i in arr){
      if (arr[i] !== null){ //если не нулл
        if (arr[i] == arr[+i+1]){ //и она равна следующей цифре
          newArr.push(arr[i]*2); //составляем новый массив, перемножая на два
          this.score.emit(arr[i]*2);
          arr[+i+1] = null; //следующая равна нулл
        }else if(arr[+i+1] == null && arr[i] == arr[+i+2]){
          newArr.push(arr[i]*2);
          this.score.emit(arr[i]*2);
          arr[+i+2] = null;
        }else if(arr[+i+1] == null && arr[+i+2] == null && arr[i] == arr[+i+3]){
          newArr.push(arr[i]*2);
          this.score.emit(arr[i]*2);
          arr[+i+3] = null;
        }else {
          newArr.push(arr[i]); //не равна следующей
        }
      }else newArr.push(null);
    }
    return newArr
  }
  _reverse(arrays: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    for(let arr of arrays){
      newArrays.push(
        arr.reverse()
      )
    }
    return newArrays
  }
  _fillMissingUp(arrays: Array<Array<number>>,swipe: string): Array<Array<number>>{
    const times = x=> f=> {
      if (x > 0) {
        f();
        times (x - 1) (f)
      }
    };
    let newArrays = [];
    for(let arr of arrays){
      let newArr = [];
      if(arr.length<4){
        times(4-arr.length)(() => newArr.unshift(null));
      }
      newArrays.push(swipe == 'swipeRight' ? newArr.concat(arr) : arr.concat(newArr));
    }
    return newArrays
  }
  _concatination(arrays: Array<Array<number>>): Array<number>{
    let newArray = [];
    for(let arr of arrays){
      newArray = newArray.concat(arr);
    }
    return newArray
  }
  _remodel(arrays: Array<Array<number>>): Array<number>{
    let newArrays = [];
    for(let i = 0;i<4;i++){
      let arr = [];
      for(let array of arrays){
        arr.push(array[i])
      }
      newArrays.push(arr);
    }
    return this._concatination(newArrays);
  }

}
