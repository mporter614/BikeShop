import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { BikeListComponent } from './bike-list/bike-list.component';
import { BikeComponent } from './bike/bike.component';
import { BikeShopRoutingModule } from './bike-shop-routing.module';
import { BikeFormComponent } from './bike-form/bike-form.component';

@NgModule({
  declarations: [BikeListComponent, BikeComponent, BikeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    BikeShopRoutingModule,
  ],
})
export class BikeShopModule {}
