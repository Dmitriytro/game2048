import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

export class ScoreboardComponent implements OnInit {
  players: Player[] = [];
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.loadPlayers();
  }
  loadPlayers(): void{
    this.playerService.getPlayers()
      .map(res => res.filter((player)=>player.name))
      .map(res => res.sort((a,b)=> a.score > b.score))
      .subscribe(players => this.players = players);
  }
}
