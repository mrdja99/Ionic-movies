import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Movie } from '../movie-model';

@Component({
  selector: 'app-movie-element',
  templateUrl: './movie-element.component.html',
  styleUrls: ['./movie-element.component.scss'],
})
export class MovieElementComponent implements OnInit {

  @Input() movie: Movie ;

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

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


}
