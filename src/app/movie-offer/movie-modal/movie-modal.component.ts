/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Movie } from '../movie-model';
import { MovieOfferService } from '../movie-offer.service';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent implements OnInit {
  @ViewChild('f',{static:true}) form: NgForm;

  @Input() id: string;

  @Input() title: string;
  @Input() synopsys: string;
  @Input() imageUrl: string;
  @Input() director: string;
  @Input() actors: string;
  @Input() movieId: string;


  constructor(
    private modalCtrl: ModalController,
    private movieOfferService: MovieOfferService,
    private loadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddMovie() {
    if(!this.form.valid) {
      return;
    }
    console.log("testdsadsadasdsadasddds");

    this.modalCtrl.dismiss({
      movieData: {

        title: this.form.value['title'],
        synopsys: this.form.value['synopsys'],
        imageUrl: this.form.value['imageUrl'],
        director: this.form.value['director'],
        actors: this.form.value['actors']

      }
    }, 'confirm');

  }


  onUpdateMovie(id: string) {
    this.loadingCtrl
      .create({
        message: 'Updating movie...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        console.log("VELIKO VELIKO");
        this.movieOfferService
          .updateMovie(id, this.form.value)
          .subscribe(() => {
            loadingEl.dismiss();
            this.router.navigate(['/movie-offer/tabs/movie-explore']);
          });
      });
  }


  // onUpdateMovie(movie: Movie) {
  //   console.log('Click');
  //   this.modalCtrl.create({
  //     component: MovieModalComponent,
  //     componentProps: {
  //       //title: 'Edit movie',
  //       //synopsys: movie.synopsys,
  //       //imageUrl: movie.imageUrl,
  //       //director: movie.director,
  //       //actors: movie.actors
  //     }
  //   }).then((modal: HTMLIonModalElement) => {
  //     modal.present();
  //     return modal.onDidDismiss();
  //   }).then((resultData) => {
  //     if(resultData.role === 'confirm') {
  //       console.log(resultData);
  //       this.movieOfferService.updateMovie(
  //         resultData.data.movie.id,
  //         resultData.data.form.value
  //         ).subscribe(movies=> {
  //          console.log(movies);
  //       });
  //     }
  //   });
  // }


}
