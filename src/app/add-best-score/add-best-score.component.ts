import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from "../player.service";

@Component({
  selector: 'app-add-best-score',
  templateUrl: './add-best-score.component.html',
  styleUrls: ['./add-best-score.component.css']
})
export class AddBestScoreComponent implements OnInit {
  // @Input() playerScore: number;
  // player: Player = { name: ``, score: this.playerScore, lastPosition: []};
  constructor(private playerService: PlayerService) { }

  ngOnInit() {}
  addBestScore(player): void{
    this.playerService.savePlayer(player)
      .subscribe((res) => console.log('player saved'));
  }
}
