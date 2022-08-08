import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-movie-element',
  templateUrl: './movie-element.component.html',
  styleUrls: ['./movie-element.component.scss'],
})
export class MovieElementComponent implements OnInit, OnDestroy {

  @Input() movie: Movie ;


  constructor(
    private alertCtrl: AlertController,
    private loaddingCtrl: LoadingController,
    private movieOfferService: MovieOfferService,
    private router: Router
    ) { }

  ngOnInit(
  ) {}

  ionViewWillEnter() {
  }

  openAlert(event) {

    event.stopPropagation();
    event.preventDefault();

    this.alertCtrl.create({
      header: 'Add to cart',
      message: 'Are you sure',
      buttons: [{
        text: 'Add',
        handler: () => {
          console.log('Added to page your movies');
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Canceled');
        }
      }]
    }).then((alert)=>{
      alert.present();
    });

  }

  onCart() {
    this.loaddingCtrl.create({
      message: 'Reserving movie...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.movieOfferService.addYourMovie(
        this.movie.title,
        this.movie.synopsys,
        this.movie.imageUrl,
        this.movie.director,
        this.movie.actors
      ).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/your-movies']);
      });
    });
  }

  ngOnDestroy() {
  }

}
