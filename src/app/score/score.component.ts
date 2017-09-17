import { Component, OnInit } from '@angular/core';
import { SwipeService } from "../swipe.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score: number = 0;
  bestScore: number = 0;
  addScoreSubs: Subscription;
  zerScoreSubs: Subscription;
  constructor(private swipeService: SwipeService) { }
  restart(): void{
    this.swipeService.restartGame();
  }
  ngOnInit(): void{
    this.addScoreSubs = this.swipeService.addingScore$.subscribe(score => {
      this.score += score;
      if(this.score>this.bestScore) this.bestScore = this.score;
    });
    this.zerScoreSubs = this.swipeService.zeroingOuter$.subscribe(zero => this.score = zero);
  }
  ngOnDestroy(): void{
    this.zerScoreSubs.unsubscribe();
    this.addScoreSubs.unsubscribe();
  }
}
