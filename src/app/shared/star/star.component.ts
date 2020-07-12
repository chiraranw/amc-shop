import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'amc-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  @Input('rating') rating: number;
  @Output('ratingClicked') ratingClicked: EventEmitter<
    string
  > = new EventEmitter<string>();
  starWidth: number;

  constructor() {}

  onClick() {
    this.ratingClicked.emit('The rating was clicked...');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.starWidth = (this.rating * 75) / 5;
  }
}
