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
      // {
      //   path: 'your-movies',
      //   loadChildren: () => import('./your-movies/your-movies.module').then( m => m.YourMoviesPageModule)
      // },
      // {
      //   path: 'favorite-movies',
      //   loadChildren: () => import('./favorite-movies/favorite-movies.module').then( m => m.FavoriteMoviesPageModule)
      // },
      // {
      //   path: 'watchlist',
      //   loadChildren: () => import('./watchlist/watchlist.module').then( m => m.WatchlistPageModule)
      // },
      // {
      //   path: 'search',
      //   loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      // },

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieOfferPageRoutingModule {}
