/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @Input() movie: Movie;
  movies: Movie[];
  private movieSub: Subscription;
  private searchedMovies: Movie[];
  searchTerm: string;

  constructor(private movieOfferService: MovieOfferService) { }

  ngOnInit() {
    this.movieSub = this.movieOfferService.movies.subscribe((movies) => {
      this.movies = movies;
    });
  }

  ionViewWillEnter() {
    this.movieOfferService.getMovies().subscribe((movies) => {
      //this.movies = movies;
    });
  }



}
