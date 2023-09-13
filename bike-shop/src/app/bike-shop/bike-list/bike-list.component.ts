import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Bike, BikeType } from '../../domain/bike';
import { BikeService } from 'src/app/bike.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  BIKE_FORM_DEFAULT_DIMENSIONS,
  BikeFormComponent,
} from '../bike-form/bike-form.component';
@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeListComponent {
  bikes$: Observable<Bike[]> = this.bikeService.getAll();

  constructor(public dialog: MatDialog, private bikeService: BikeService) {}

  openDialog(bike?: Bike): Observable<any> {
    const dialogRef = this.dialog.open(BikeFormComponent, {
      ...BIKE_FORM_DEFAULT_DIMENSIONS,
      data: { bike: bike },
    });

    return dialogRef.afterClosed();
  }

  onCreate() {
    console.log('onCreate clicked');
    this.openDialog().subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');
      if (result) {
        console.log('calling create');
        this.bikeService.create(result);
      }
    });
  }

  onUpdate(bikeId: string, bike: Bike) {
    console.log(bike);
    console.log('onUpdate clicked');
    this.openDialog(bike).subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');
      if (result) {
        console.log('calling update for bike:', bikeId);
        this.bikeService.update(bikeId, result);
      }
    });
  }

  onDelete(bikeId: string) {
    console.log('onDelete clicked');
    console.log('calling delete for bike:', bikeId);
    this.bikeService.delete(bikeId);
  }
}
