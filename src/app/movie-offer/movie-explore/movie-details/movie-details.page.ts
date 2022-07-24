import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../movie-model';
import { MovieOfferService } from '../../movie-offer.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie: Movie;

  constructor(private routes: ActivatedRoute, private movieOfferService: MovieOfferService) { }

  ngOnInit() {
    this.routes.paramMap.subscribe(paramMap => {
      this.movieOfferService.getMovie(paramMap.get('movieId')).subscribe(movie => {this.movie = movie;});
      console.log(this.movie);
    });
  }

}
