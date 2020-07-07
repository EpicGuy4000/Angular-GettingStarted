import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {range} from "./range";

@Component({
  styleUrls: ['./star.component.css'],
  templateUrl: './star.component.html',
  selector: 'pm-star'
})
export class StarComponent implements OnChanges{
  ratingWidth: number;
  @Input() rating: number;

  private readonly STAR_WIDTH: number = 15;
  private readonly MAX_RATING: number = 5;
  readonly MAX_WIDTH: number = this.STAR_WIDTH * this.MAX_RATING;

  ngOnChanges(changes: SimpleChanges): void {
    this.ratingWidth = this.rating * this.STAR_WIDTH;
  }

  starRatings(): number[] {
    return range(1, this.MAX_RATING, 1);
  }

  @Output() ratingClicked : EventEmitter<string> = new EventEmitter<string>();

  onClick() : void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
