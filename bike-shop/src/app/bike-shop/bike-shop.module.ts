import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeListComponent } from './bike-list/bike-list.component';
import { BikeComponent } from './bike/bike.component';
import { BikeShopRoutingModule } from './bike-shop-routing.module';

@NgModule({
  declarations: [BikeListComponent, BikeComponent],
  imports: [CommonModule, BikeShopRoutingModule],
})
export class BikeShopModule {}
