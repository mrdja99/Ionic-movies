import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-movie-explore',
  templateUrl: './movie-explore.page.html',
  styleUrls: ['./movie-explore.page.scss'],
})
export class MovieExplorePage implements OnInit, OnDestroy {

  // movies: Movie[] = [
  //   {
  //     id: 'm1',
  //     title: 'Godfather',
  //     // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //     synopsys: 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
  //     director: 'Francis Ford Copola',
  //     actors: 'Marlon Brando, Al Pacino...',
  //     // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //     imageUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg'
  //   },
  //   {
  //     id: 'm2',
  //     title: 'Godfather part 2',
  //     // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //     synopsys: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
  //     director: 'Francis Ford Copola',
  //     actors: 'Robert De Niro, Al Pacino...',
  //     // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //     imageUrl: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
  //   }
  // ];

  movies: Movie[];
  private movieSub: Subscription;

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

  ngOnDestroy() {
    if(this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }

}
