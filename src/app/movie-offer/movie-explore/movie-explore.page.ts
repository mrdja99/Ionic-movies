/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';
import { MovieExplorePageModule } from './movie-explore.module';

@Component({
  selector: 'app-movie-explore',
  templateUrl: './movie-explore.page.html',
  styleUrls: ['./movie-explore.page.scss'],
})
export class MovieExplorePage implements OnInit, OnDestroy {

  @Input() movie: Movie;
  movies: Movie[];
  private movieSub: Subscription;
  searchTerm: string;

  title: string;

  constructor(private movieOfferService: MovieOfferService, private modalCtrl: ModalController, private loaddingCtrl: LoadingController) {
    console.log('constructor');
    //this.movies = this.movieOfferService.movies;
   }

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

  openModal() {
    console.log('Click');
    this.modalCtrl.create({
      component: MovieModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        this.movieOfferService.addMovie(
          resultData.data.movieData.title,
          resultData.data.movieData.synopsys,
          resultData.data.movieData.imageUrl,
          resultData.data.movieData.director,
          resultData.data.movieData.actors
          ).subscribe(movies=> {
           console.log(movies);
        });
      }
    });
  }

  onDeleteMovie(movieId: string) {
    this.loaddingCtrl.create({
      message: 'Deleting movie...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.deleteMovie(movieId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  onUpdateMovie(movie: Movie) {
    console.log('Click');
    this.modalCtrl.create({
      component: MovieModalComponent,
      componentProps: {
        title: movie.title,
        synopsys: movie.synopsys,
        imageUrl: movie.imageUrl,
        director: movie.director,
        actors: movie.actors,
        id: movie.id
      }
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        this.movieOfferService.updateMovie(
          resultData.data.movie.movieId,
          resultData.data.componentProps
          ).subscribe(movies=> {
           console.log(movies);
        });
      }
    });
  }


  ngOnDestroy() {
    if(this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }

}
