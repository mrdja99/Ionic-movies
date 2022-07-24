/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent implements OnInit {
  @ViewChild('f',{static:true}) form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddMovie() {
    if(!this.form.valid) {
      return;
    }

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

}
