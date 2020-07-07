import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {range} from "./range";

@Component({
  styleUrls: ['./star.component.css'],
  templateUrl: './star.component.html',
  selector: 'pm-star'
})
export class StarComponent implements OnChanges{
  starWidth: number;
  @Input() rating: number;

  readonly MAX_WIDTH: number = 75;
  private readonly MAX_RATING: number = 5;

  ngOnChanges(changes: SimpleChanges): void {
    this.starWidth = this.rating * this.MAX_WIDTH/this.MAX_RATING;
  }

  starRatings(): number[] {
    return range(1, this.MAX_RATING, 1);
  }

  @Output() ratingClicked : EventEmitter<string> = new EventEmitter<string>();

  onClick() : void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
