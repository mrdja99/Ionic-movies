import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieOfferPage } from './movie-offer.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MovieOfferPage,
    children:[
      {
        path: 'movie-explore',
        loadChildren: () => import('./movie-explore/movie-explore.module').then( m => m.MovieExplorePageModule)
      },
      {
        path: '',
        redirectTo: '/movie-offer/tabs/movie-explore',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/movie-offer/tabs/movie-explore',
    pathMatch: 'full'
  },
  {
    path: 'your-movies',
    loadChildren: () => import('./your-movies/your-movies.module').then( m => m.YourMoviesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieOfferPageRoutingModule {}
