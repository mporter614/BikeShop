import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeListComponent } from './bike-list/bike-list.component';
import { BikeComponent } from './bike/bike.component';
import { BikeShopRoutingModule } from './bike-shop-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [BikeListComponent, BikeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    BikeShopRoutingModule,
  ],
})
export class BikeShopModule {}
