import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { BoxComponent } from './box/box.component';
import { SpotComponent } from './spot/spot.component';
import { SwipeService } from "./swipe.service";


@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    BoxComponent,
    SpotComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule
  ],
  providers: [
    SwipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
