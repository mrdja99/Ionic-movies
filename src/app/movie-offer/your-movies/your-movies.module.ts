import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourMoviesPageRoutingModule } from './your-movies-routing.module';

import { YourMoviesPage } from './your-movies.page';
import { YourMovieItemComponent } from './your-movie-item/your-movie-item.component';
import { MovieOfferPage } from '../movie-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourMoviesPageRoutingModule
  ],
  declarations: [YourMoviesPage, YourMovieItemComponent, MovieOfferPage]
})
export class YourMoviesPageModule {}
