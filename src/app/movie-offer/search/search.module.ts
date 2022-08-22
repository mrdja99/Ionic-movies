import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { MovieOfferPage } from '../movie-offer.page';
import { MovieElementComponent } from '../movie-element/movie-element.component';
import { Ng2SearchPipeModule, Ng2SearchPipe } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SearchPage, MovieOfferPage, MovieElementComponent]
})
export class SearchPageModule {}
