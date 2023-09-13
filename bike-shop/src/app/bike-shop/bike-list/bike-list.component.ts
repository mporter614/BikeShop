import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Bike } from '../../domain/bike';
import { BikeService } from 'src/app/bike.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  BIKE_FORM_DEFAULT_DIMENSIONS,
  BikeFormComponent,
} from '../bike-form/bike-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeListComponent {
  bikes$: Observable<Bike[]> = this.bikeService.getAll();

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private bikeService: BikeService
  ) {}

  openDialog(bike?: Bike): Observable<any> {
    const dialogRef = this.dialog.open(BikeFormComponent, {
      ...BIKE_FORM_DEFAULT_DIMENSIONS,
      data: { bike: bike },
    });

    return dialogRef.afterClosed();
  }

  openSnackBar(message: string, action: string = 'OKAY') {
    this.snackBar.open(message, action);
  }

  onCreate() {
    this.openDialog().subscribe((result) => {
      if (result) {
        this.bikeService.create(result);
        this.openSnackBar('Bike created');
      }
    });
  }

  onUpdate(bikeId: string, bike: Bike) {
    this.openDialog(bike).subscribe((result) => {
      if (result) {
        this.bikeService.update(bikeId, result);
        this.openSnackBar(`Bike with bikeId: ${bikeId} updated`);
      }
    });
  }

  onDelete(bikeId: string) {
    this.bikeService.delete(bikeId);
    this.openSnackBar(`Bike with bikeId: ${bikeId} deleted`);
  }
}
