import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikeListComponent } from './bike-list/bike-list.component';
import { BikeComponent } from './bike/bike.component';

const routes: Routes = [
  {
    path: '',
    component: BikeListComponent,
  },
  {
    path: ':id',
    component: BikeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikeShopRoutingModule {}
