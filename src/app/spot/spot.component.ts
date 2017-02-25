import { Component, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnChanges {
  @Input() number: Number;
  constructor() { }
  ngOnChanges(): void{}
}
