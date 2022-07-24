import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-your-movies',
  templateUrl: './your-movies.page.html',
  styleUrls: ['./your-movies.page.scss'],
})
export class YourMoviesPage implements OnInit, OnDestroy {

  yourMovies: Movie[];
  private movieSub: Subscription;

  constructor(private movieOfferService: MovieOfferService) { }

  ngOnInit() {

    /*this.movieSub = this.movieOfferService.movies.subscribe(movies => {
      this.yourMovies = movies;
    });*/
  }

  ngOnDestroy(): void {

    /*if(this.movieSub) {
      this.movieSub.unsubscribe();
    }*/
  }

}
