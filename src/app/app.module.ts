import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { BoxComponent } from './box/box.component';
import { SpotComponent } from './spot/spot.component';
import { SwipeService } from "./swipe.service";
import { AnimationService } from "./animation.service";

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    BoxComponent,
    SpotComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    SwipeService,
    AnimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
