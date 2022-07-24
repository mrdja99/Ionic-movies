import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-offer',
  templateUrl: './movie-offer.page.html',
  styleUrls: ['./movie-offer.page.scss'],
})
export class MovieOfferPage implements OnInit, OnDestroy {

  constructor() {
    console.log('constructor');
   }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
