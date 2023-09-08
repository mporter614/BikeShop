import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeListComponent } from './bike-list/bike-list.component';
import { BikeComponent } from './bike/bike.component';



@NgModule({
  declarations: [
    BikeListComponent,
    BikeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BikeShopModule { }
