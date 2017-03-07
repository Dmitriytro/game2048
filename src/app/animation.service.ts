import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {

  constructor() { }
  animationCountRight(newList: Array<number>,list: Array<number>): Array<string>{
    let cuttedList = this._cutRow(list);
    let cuttedNewList = this._cutRow(newList);
    let animationList = this._animationCompilation(cuttedList,cuttedNewList);
    return ['']
  }
  _animationCompilation(list: Array<Array<number>>, newList: Array<Array<number>>): Array<number>{
    let animationArr = [];
    let nullArrays = this._comperingRows(list);
    let nullNewArrays = this._comperingRows(newList);

    for (let k of [0,1,2,3]) {
      let animationLine = [];
      let currentNulls = nullArrays[k];
      let currentNewNulls = nullNewArrays[k];
      let oldNulls = currentNulls;
      let newNulls = currentNewNulls;
      let doubledIndex = null;
      let doubleCounter = 0;
      let extend = 0;
      if(oldNulls<newNulls){
        let listWithoutNulls = this._cutNulls(list[k]);
        let newListWithoutNulls = this._cutNulls(newList[k]);

        for(let i of [0,1,2,3]) {
          if(listWithoutNulls[i] !== newListWithoutNulls[i]) doubledIndex = i;
        }
      }
      for (let i of [0,1,2,3]) {
        if (list[k][i] !== null){
          if(doubleCounter == doubledIndex) extend = 1;
          animationLine.push(currentNewNulls+extend);
          if(extend == 1) extend = 0;
          doubleCounter++
        } else{
          animationLine.push(0);
        }
        currentNewNulls>0 ? currentNewNulls-- : currentNewNulls = 0;
      }
      animationArr = animationArr.concat(animationLine)
    }
    console.log(animationArr);
    return animationArr
  }
  _cutNulls(list: Array<number>): Array<number>{
    let newList = list.filter(elem => elem !== null);
    return newList
  }
  _cutRow(list: Array<number>): Array<Array<number>>{
    let newArr = [];
    newArr.push(list.slice(0,4));
    newArr.push(list.slice(4,8));
    newArr.push(list.slice(8,12));
    newArr.push(list.slice(12));
    return newArr
  }
  _comperingRows(newList: Array<Array<number>>): Array<number>{
    let arrayOfNum = [];
    for(let k of [0,1,2,3]) {
      let newListNull = 0;
      for (let i of [0,1,2,3]) {
        if (newList[k][i] == null) newListNull++;
      }
      arrayOfNum.push(newListNull);
    }
    return arrayOfNum
  }
}
