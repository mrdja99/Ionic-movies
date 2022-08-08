import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.page.html',
  styleUrls: ['./favorite-movies.page.scss'],
})
export class FavoriteMoviesPage implements OnInit, OnDestroy {

  @Input() favorite: Movie;
  favorites: Movie[];
  private movieSub: Subscription;

  constructor(
    private movieOfferService: MovieOfferService,
    private loaddingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {

    this.movieSub = this.movieOfferService.favorites.subscribe(movies => {
      this.favorites = movies;
     });
  }

  ionViewWillEnter() {
    this.movieOfferService.getFavorites().subscribe((movies) => {
        //this.favorites = movies;
      });
  }

  onDeleteFavorite(movieId: string) {
    this.loaddingCtrl.create({
      message: 'Deleting favorite movie...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.deleteFavoriteMovie(movieId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
      if(this.movieSub) {
        this.movieSub.unsubscribe();
      }
  }

}
