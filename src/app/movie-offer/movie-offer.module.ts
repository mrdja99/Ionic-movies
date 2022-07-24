import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieOfferPageRoutingModule } from './movie-offer-routing.module';

import { MovieOfferPage } from './movie-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieOfferPageRoutingModule
  ],
  declarations: [MovieOfferPage]
})
export class MovieOfferPageModule {}
