import { Component, OnInit } from '@angular/core';
import { SwipeService } from "../swipe.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: number = 0;
  constructor(private swipeService: SwipeService) { }

  ngOnInit() {
    this.swipeService.scoreIncrease().subscribe(score => this.score += score);
  }

}
