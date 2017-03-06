import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {

  constructor() { }
  animationCountRight(newList: Array<number>,list: Array<number>): Array<string>{
    let animationArr = [];
    let cuttedList = this._cutRow(list);
    let cuttedNewList = this._cutRow(newList);
    let nullArrays = this._comperingRows(cuttedList,cuttedNewList);
    for (let k of [0,1,2,3]) {
      let animationLine = [];
      for (let i of [0,1,2,3]) {
        // cuttedNewList[k][i]
        let currentNulls = nullArrays[k]; //сколько null стало
        if (cuttedList[k][i] !== null){ //если здесь не null, значит надо лететь на к-во нулл
          animationLine.push(currentNulls); //вписываем колличество перелетаемых клеток, по кол-ву null
        } else{
          animationLine.push(0);
          currentNulls--; //или вычитаем нулл
          // нужно понять что пистаь, сколько было null или стало?
          // последнее не может лететь.
          // оно объединяется
        }
      }
      animationArr = animationArr.concat(animationLine)
    }
    console.log(animationArr);
    return ['']
  }
  _cutRow(list: Array<number>): Array<Array<number>>{
    let newArr = [];
    newArr.push(list.slice(0,4));
    newArr.push(list.slice(4,8));
    newArr.push(list.slice(8,12));
    newArr.push(list.slice(12));
    return newArr
  }
  _comperingRows(newList: Array<Array<number>>,list:Array<Array<number>>): Array<number>{
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
  _nullsCount(){}
}
