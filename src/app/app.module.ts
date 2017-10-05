import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { BoxComponent } from './box/box.component';
import { SpotComponent } from './spot/spot.component';
import { SwipeService } from "./swipe.service";
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PlayerService } from "./player.service";
import { AddBestScoreComponent } from './add-best-score/add-best-score.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    BoxComponent,
    SpotComponent,
    ScoreboardComponent,
    AddBestScoreComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    SwipeService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
