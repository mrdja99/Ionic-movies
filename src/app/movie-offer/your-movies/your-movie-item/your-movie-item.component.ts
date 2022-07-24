import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../movie-model';

@Component({
  selector: 'app-your-movie-item',
  templateUrl: './your-movie-item.component.html',
  styleUrls: ['./your-movie-item.component.scss'],
})
export class YourMovieItemComponent implements OnInit {
  @Input() yourMovie: Movie;

  constructor() { }

  ngOnInit() {}

}
