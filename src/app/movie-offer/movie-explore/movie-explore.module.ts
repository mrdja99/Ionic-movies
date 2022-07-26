import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieExplorePageRoutingModule } from './movie-explore-routing.module';

import { MovieExplorePage } from './movie-explore.page';
import { MovieElementComponent } from '../movie-element/movie-element.component';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { Ng2SearchPipeModule, Ng2SearchPipe } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieExplorePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [MovieExplorePage, MovieElementComponent, MovieModalComponent],
  entryComponents: [MovieModalComponent]
})
export class MovieExplorePageModule {}
