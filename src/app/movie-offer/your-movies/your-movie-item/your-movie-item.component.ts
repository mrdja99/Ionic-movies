import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Movie } from '../../movie-model';
import { MovieOfferService } from '../../movie-offer.service';

@Component({
  selector: 'app-your-movie-item',
  templateUrl: './your-movie-item.component.html',
  styleUrls: ['./your-movie-item.component.scss'],
})
export class YourMovieItemComponent implements OnInit {
  @Input() yourMovie: Movie;

  constructor(private loaddingCtrl: LoadingController, private movieOfferService: MovieOfferService) { }

  ngOnInit() {}


}
