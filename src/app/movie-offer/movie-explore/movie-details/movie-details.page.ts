import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Movie } from '../../movie-model';
import { MovieOfferService } from '../../movie-offer.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie: Movie;

  constructor(
    private routes: ActivatedRoute,
    private movieOfferService: MovieOfferService,
    private loaddingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
    this.routes.paramMap.subscribe(paramMap => {
      this.movieOfferService.getMovie(paramMap.get('movieId')).subscribe(movie => {this.movie = movie;});
      console.log(this.movie);
    });
  }

  onAddFavorites() {
    this.loaddingCtrl.create({
      message: 'Adding to favorites...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.addFavorites(
        this.movie.title,
        this.movie.synopsys,
        this.movie.imageUrl,
        this.movie.director,
        this.movie.actors
      ).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/favorite-movies']);
      });
    });
  }

  onAddWatchlist() {
    this.loaddingCtrl.create({
      message: 'Adding to watchlist...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.addWatchlist(
        this.movie.title,
        this.movie.synopsys,
        this.movie.imageUrl,
        this.movie.director,
        this.movie.actors
      ).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/watchlist']);
      });
    });
  }

}
