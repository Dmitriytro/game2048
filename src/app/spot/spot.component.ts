import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {
  @Input() number: Number;
  constructor() { }

  ngOnInit() {
    console.log(this.number);
  }

}
