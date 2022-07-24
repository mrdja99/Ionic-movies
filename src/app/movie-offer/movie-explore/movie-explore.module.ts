import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieExplorePageRoutingModule } from './movie-explore-routing.module';

import { MovieExplorePage } from './movie-explore.page';
import { MovieElementComponent } from '../movie-element/movie-element.component';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieExplorePageRoutingModule
  ],
  declarations: [MovieExplorePage, MovieElementComponent, MovieModalComponent],
  entryComponents: [MovieModalComponent]
})
export class MovieExplorePageModule {}
