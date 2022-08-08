import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'movie-offer',
    loadChildren: () => import('./movie-offer/movie-offer.module').then( m => m.MovieOfferPageModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'your-movies',
    loadChildren: () => import('./movie-offer/your-movies/your-movies.module').then( m => m.YourMoviesPageModule),
  },
  {
    path: 'favorite-movies',
    loadChildren: () => import('./movie-offer/favorite-movies/favorite-movies.module').then( m => m.FavoriteMoviesPageModule)
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./movie-offer/watchlist/watchlist.module').then( m => m.WatchlistPageModule)
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
