import { Injectable } from '@angular/core';

@Injectable()
export class SwipeService {

  constructor() { }
  swipeRight(list: Array<number>): Array<number>{
    // console.log('swipeRight');
    let animation = list.slice();
    let animationArr = this._cutRow(animation);
    let lines = this._cutRowReverse(list);
    animationArr = this._countionFA(animationArr);
    animationArr = this._countionSA(animationArr,lines);
    animationArr.forEach((elem)=>console.log(elem));
    lines = this._doubleNearby(lines);
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
  _countionFA(arrays: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    for(let array of arrays){
      array = array.reverse();
      let newA = [];
      let numCounter = 0;
      array.forEach((elem,i)=>{
        if(elem == null) newA[i] = null;
        else {
          newA[i] = i-numCounter;
          numCounter++;
        }
      });
      newArrays.push(newA.reverse());
    }

    return newArrays
  }
  _countionSA(aniArrays: Array<Array<number>>,listArr: Array<Array<number>>): Array<Array<number>>{
    let newArrays = [];
    for(let i of [0,1,2,3]){
      let currentLine = listArr[i].slice(); //реверс основной линии
      let result = aniArrays[i].reverse();
      let pass = false;
      result.forEach((elem,idx,arr)=>{ //передираем анимационный реверс
        if(!pass){
          if(currentLine[idx] !== null){ //если первый элеммент пустой, пропускаем
            if(currentLine[idx] == currentLine[+idx+1]){  //если есть совпадение
              let left = currentLine.length-1-idx; //прибавить всем впереди
              for(let j = 0;j<left;j++){
                if(currentLine[+idx+1+j] !== null){ //если не пустая клетка, то прибавляем в анимацию
                  arr[+idx+1+j] = arr[+idx+1+j]+1;
                }
              }
              pass = true;
            }
          }
        } else {
          pass = false;
        }
      });
      newArrays.push(result.reverse()); //результат этого блока: просчетать дополнительные шаги при слияние
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
