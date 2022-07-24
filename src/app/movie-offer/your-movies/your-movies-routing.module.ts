import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourMoviesPage } from './your-movies.page';

const routes: Routes = [
  {
    path: '',
    component: YourMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourMoviesPageRoutingModule {}
