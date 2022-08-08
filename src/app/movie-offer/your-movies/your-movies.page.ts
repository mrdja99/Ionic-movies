import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-your-movies',
  templateUrl: './your-movies.page.html',
  styleUrls: ['./your-movies.page.scss'],
})
export class YourMoviesPage implements OnInit, OnDestroy {
  @Input() yourMovie: Movie;
  yourMovies: Movie[];
  private movieSub: Subscription;

  constructor(private movieOfferService: MovieOfferService, private loaddingCtrl: LoadingController) { }

  ngOnInit() {

       this.movieSub = this.movieOfferService.yourMovies.subscribe(movies => {
         this.yourMovies = movies;
        });
  }

  ionViewWillEnter() {
       this.movieOfferService.getYourMovies().subscribe((movies) => {
           //this.yourMovies = movies;
         });
  }

  onDelete(movieId: string) {
    this.loaddingCtrl.create({
      message: 'Deleting movie...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.deleteYourMovie(movieId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }


  ngOnDestroy(): void {

       if(this.movieSub) {
         this.movieSub.unsubscribe();
       }
  }

}
