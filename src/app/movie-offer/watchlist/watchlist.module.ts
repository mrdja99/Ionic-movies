import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlistPageRoutingModule } from './watchlist-routing.module';

import { WatchlistPage } from './watchlist.page';
import { MovieOfferPage } from '../movie-offer.page';
import { YourMovieItemComponent } from '../your-movies/your-movie-item/your-movie-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlistPageRoutingModule
  ],
  declarations: [WatchlistPage, YourMovieItemComponent]
})
export class WatchlistPageModule {}
