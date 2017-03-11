import { Component, OnInit} from '@angular/core';
import { SwipeService } from "../swipe.service";
import {AnimationService} from "../animation.service";

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
    4,4,null,null,
    null,4,null,4,
    4,null,null,4,
    null,null,4,4
  ];
  animationList = [
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
      this.animationList = result[1];
      setTimeout(
        ()=>{
          this.sharedList = this._extention(result[0]);
        },300
      );
    }else if(e.code == 'ArrowLeft'){
      let newList = this.swipeService.swipeLeft(this.sharedList);
      this.sharedList = this._extention(newList);
    }else if(e.code == 'ArrowDown'){
      let newList = this.swipeService.swipeDown(this.sharedList);
      this.sharedList = this._extention(newList);
    }else if(e.code == 'ArrowUp'){
      let newList = this.swipeService.swipeUp(this.sharedList);
      this.sharedList = this._extention(newList);
    }

  }
  _keydown(e: Event): void{
    e.preventDefault();
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
  /*
  Promise
  Promise созданны для организации асинхронного кода и  неявно используются в генераторах
  Это обьект с 3 состояниями: 1) pending 2) fulfilled 3) rejected
  можно навешивать колбэки 2 типов: onFulfilled и onRejected
   var promise = new Promise(function(resolve, reject) {resolve() or reject()})
   это содание нового обьекта и передача ему в аргументы функции которая будет выполнена сразу, и внутри будем менять
   состояние в зависимости от успешности выполнения
   в resolve и reject можно передать только 1 аргумент результата
   promise.then(onFulfilled, onRejected)
   .then принимает 2 функции, которые будут выполненны по завершению выполнения основного кода
   promise.then(onFulfilled) //только успешный вариант
   promise.then(null, onRejected) //только ошибка .catch(onRejected) или throw new Error("o_O");
   обычно в reject передают объект ошибки

   promise не может иметь обратного действия. Если произошел resolve, за ним не может идти reject

   Http объект в angular2 возвращает Observable который мы можем переделать в Promise через .toPromise() оператор

   Цепочка промисов работает по принципу, следующий then может идти если преведущая функция отработана или если она
   возвращает promise, можно вернуть http запрос

   Object Promise имеет св-ва:
   PromiseState, PromiseResult, PromiseFulfillReactions, PromiseRejectReactions
   меняется, при изменение состояния, вначале пуст, и две очереди колбэков

   К одному обьекту можно привязать 2 then, и они выполнятся один, за другим

   Promise.all(iterable) Ждём когда всё зарезолвится!
   Promise.race(iterable) Ждём только первый промис!
   Promise.resolve(value) Можем начать цепочку с value!
   Promise.resolve(window.location) // начать с этого значения
   .then(httpGet) // вызвать для него httpGet
   .then(alert) // и вывести результат
   Promise.reject(error) //аналоги
   */
}
