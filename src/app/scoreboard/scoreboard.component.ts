import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.sass']
})

export class ScoreboardComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.loadPlayers();
  }
  loadPlayers(): void{
    this.playerService.getPlayers()
      .map(res => res.filter((player)=>player.name))
      .map(res => res.sort((a,b)=> b.bestScore - a.bestScore))
      .subscribe(players => this.players = players);
  }
}
