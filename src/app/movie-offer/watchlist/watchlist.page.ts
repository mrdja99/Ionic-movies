import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit, OnDestroy {

  @Input() watchlist: Movie;
  watchlists: Movie[];
  private movieSub: Subscription;

  constructor(
    private movieOfferService: MovieOfferService,
    private loaddingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {

    this.movieSub = this.movieOfferService.watchlist.subscribe(movies => {
      this.watchlists = movies;
     });
  }

  ionViewWillEnter() {
    this.movieOfferService.getWatchlist().subscribe((movies) => {
        //this.watchlists = movies;
      });
  }

  onDeleteWatchlist(movieId: string) {
    this.loaddingCtrl.create({
      message: 'Deleting movie from watchlist...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.deleteWatchlistMovie(movieId).subscribe(() => {
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
