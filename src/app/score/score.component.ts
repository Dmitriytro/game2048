import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SwipeService } from "../swipe.service";
import { Subscription } from 'rxjs/Subscription';
import { PlayerService } from "../player.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Output() recordSwitcher = new EventEmitter<boolean>();
  score: number = 0;
  bestScore: number = 0;
  newRecord: boolean = false;
  addScoreSubs: Subscription;
  zerScoreSubs: Subscription;
  progressSubs: Subscription;
  position: Array<number>;
  user_id: string = this._getCookie('userId');
  constructor(
    private swipeService: SwipeService,
    private playerService: PlayerService
  ) { }
  restart(): void{
    this.swipeService.restartGame();
  }
  saveProgress(): void{
    if (!navigator.cookieEnabled) {
      alert( 'Enable cookies to work with this site' );
    }
    else if(this.user_id) {
      this.playerService.saveProgress({_id: this.user_id, name: this.user_id, score: this.score ,bestScore: this.bestScore ,lastPosition: this.position})
        .subscribe(res => console.log('saved'));
    }
    else
      this.playerService.savePlayer({name: '', score: this.score , bestScore: this.score ,lastPosition: this.position})
        .subscribe(res => document.cookie = `userId=${res._id}`);
  }
  loadProgress(lastPosition: Array<number>): void{
    this.swipeService.loadProgress(lastPosition);
  }
  ngOnInit(): void{
    // this._deleteCookie('userId');
    this.progressSubs = this.swipeService.progressStream$.subscribe((res) => {
      this.position = res;
      this.saveProgress();
    });
    this.addScoreSubs = this.swipeService.addingScore$.subscribe(score => {
      this.score += score;
      if(this.score>this.bestScore) {
        this.bestScore = this.score;
        if(!this.newRecord) {
          this.newRecord = true;
          this.recordSwitcher.emit(this.newRecord);
        }
      }
    });
    this.zerScoreSubs = this.swipeService.zeroingOuter$.subscribe(zero => this.score = zero);
    if(this.user_id) {
        this.playerService.getPlayer(this.user_id)
          .subscribe(res => {
            this.score = res.score;
            this.bestScore = res.bestScore;
            this.user_id = res._id;
            this.loadProgress(res.lastPosition);
          });
    }
  }
  ngOnDestroy(): void{
    this.zerScoreSubs.unsubscribe();
    this.addScoreSubs.unsubscribe();
    this.progressSubs.unsubscribe();
  }
  _getCookie(name: string): any{
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  _deleteCookie(name: string): void {
    this._setCookie(name, "", {
      expires: -1
    })
  }
  _setCookie(name: string, value: string, options: any): void {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
  }

}
