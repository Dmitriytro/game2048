import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from "../player.service";

@Component({
  selector: 'app-add-best-score',
  templateUrl: './add-best-score.component.html',
  styleUrls: ['./add-best-score.component.css']
})
export class AddBestScoreComponent implements OnInit {
  @Output() playerSaved = new EventEmitter<boolean>();
  constructor(private playerService: PlayerService) { }
  player: Player = new Player;
  ngOnInit() {
    this.playerService.getPlayer(this._getCookie('userId'))
      .subscribe(res => {
        this.player = res;
        if(this.player.name == this.player._id) this.player.name = '';
      });
  }
  addPlayerName(): void{
    if(this.player){
      this.playerService.saveProgress(this.player)
        .subscribe((res) => this.playerSaved.emit(true));
    }
  }
  _getCookie(name: string): any{
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
