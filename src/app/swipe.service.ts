import { Injectable } from '@angular/core';

@Injectable()
export class SwipeService {

  constructor() { }
  swipeRight(list: Array<number>): Array<number>{
    console.log('swipeRight');
    let lines = this._cutRowReverse(list);
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._reverse(lines);
    lines = this._fillMissingUp(lines,'swipeRight');
    list = this._concatination(lines);
    list = this._extention(list);
    return list;
  }
  swipeLeft(list: Array<number>): Array<number>{
    console.log('swipeLeft');
    let lines = this._cutRow(list);
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._fillMissingUp(lines,'swipeLeft');
    list = this._concatination(lines);
    list = this._extention(list);
    return list;
  }
  swipeDown(list: Array<number>): Array<number>{
    console.log('swipeDown');
    let lines = this._cutColumn(list);
    lines = this._nullFilter(lines);
    lines = this._reverse(lines);
    lines = this._doubleNearby(lines);
    lines = this._reverse(lines);
    lines = this._fillMissingUp(lines,'swipeRight');
    list = this._remodel(lines);
    list = this._extention(list);
    return list;
  }
  swipeUp(list: Array<number>): Array<number>{
    console.log('swipeUp');
    let lines = this._cutColumn(list);
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._fillMissingUp(lines,'swipeLeft');
    list = this._remodel(lines);
    list = this._extention(list);
    return list;
  }
  _cutRow(list: Array<number>): Array<Array<number>>{
    let newArr = [];
    newArr.push(list.slice(0,4));
    newArr.push(list.slice(4,8));
    newArr.push(list.slice(8,12));
    newArr.push(list.slice(12));
    return newArr
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
      if (arr[i] !== null){
        if (arr[i] == arr[+i+1]){
          newArr.push(arr[i]*2);
          arr[+i+1] = null;
        }else {
          newArr.push(arr[i]);
        }
      }
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
