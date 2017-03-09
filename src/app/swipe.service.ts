import { Injectable } from '@angular/core';

@Injectable()
export class SwipeService {

  constructor() { }
  swipeRight(list: Array<number>): Array<number>{
    // console.log('swipeRight');
    //Параллельно сделаем создание анимации
    let animation = list.slice();
    let animationArr = this._cutRow(animation);
    let lines = this._cutRowReverse(list);
    let nullsArr = this._nullCounter(lines);
    animationArr = this._countionFA(animationArr,nullsArr);

    // console.log(animationArr[0]);
    // console.log(animationArr[1]);
    ///////////////////////////////////////
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    animationArr = this._countionSA(animationArr,lines.slice());
    console.log(animationArr);
    lines = this._nullFilter(lines);
    lines = this._reverse(lines);
    lines = this._fillMissingUp(lines,'swipeRight');
    list = this._concatination(lines);
    return list;
  }
  swipeLeft(list: Array<number>): Array<number>{
    console.log('swipeLeft');
    let lines = this._cutRow(list);
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._nullFilter(lines);
    lines = this._fillMissingUp(lines,'swipeLeft');
    list = this._concatination(lines);
    return list;
  }
  swipeDown(list: Array<number>): Array<number>{
    console.log('swipeDown');
    let lines = this._cutColumn(list);
    lines = this._nullFilter(lines);
    lines = this._reverse(lines);
    lines = this._doubleNearby(lines);
    lines = this._nullFilter(lines);
    lines = this._reverse(lines);
    lines = this._fillMissingUp(lines,'swipeRight');
    list = this._remodel(lines);
    return list;
  }
  swipeUp(list: Array<number>): Array<number>{
    console.log('swipeUp');
    let lines = this._cutColumn(list);
    lines = this._nullFilter(lines);
    lines = this._doubleNearby(lines);
    lines = this._nullFilter(lines);
    lines = this._fillMissingUp(lines,'swipeLeft');
    list = this._remodel(lines);
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
  _countionFA(arrays: Array<Array<number>>,nulls: Array<any>): Array<Array<number>>{
    let newArrays = [];
    for(let array of arrays){
      let newA = [];
      array.forEach((elem,i)=>{
        if(elem == null) newA[i] = null;
        else newA[i] = nulls[newArrays.length]
      });
      newArrays.push(newA);
    }
    return newArrays
  }
  _countionSA(arrays: Array<Array<number>>,arrayWithNulls: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    let plusOneArrs = [];
    arrayWithNulls.forEach((elem)=>{
      let plusOne = [];
      elem.reverse().forEach((elem,i)=>{
        if(elem == null) plusOne.push(i);
      });
      plusOneArrs.push(plusOne);
    });
    for(let i of [0,1,2,3]){
      let plusOne = plusOneArrs[i];
      let array = arrays[i];
      array.forEach((elem,i) => {
        console.log(elem);
        if(plusOne == i) elem++;
      });
      newArrays.push(array);
    }
    return newArrays
  }
  _nullCounter(arrays: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    for(let array of arrays){
      let nulls = 0;
      array.forEach((elem) => {
        if(elem == null) nulls++
      });
      newArrays.push(nulls);
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
          arr[+i+1] = null; //следующая равна нулл
        }else {
          newArr.push(arr[i]); //не равна следующей
        }
      }else newArr.push(null)
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
