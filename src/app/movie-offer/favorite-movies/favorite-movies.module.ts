import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteMoviesPageRoutingModule } from './favorite-movies-routing.module';

import { FavoriteMoviesPage } from './favorite-movies.page';
import { MovieOfferPage } from '../movie-offer.page';
import { MovieOfferService } from '../movie-offer.service';
import { YourMovieItemComponent } from '../your-movies/your-movie-item/your-movie-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteMoviesPageRoutingModule
  ],
  declarations: [FavoriteMoviesPage, YourMovieItemComponent]
})
export class FavoriteMoviesPageModule {}
