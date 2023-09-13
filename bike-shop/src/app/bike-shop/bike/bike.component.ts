import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BikeService } from 'src/app/bike.service';
import { Bike, BikeType } from 'src/app/domain/bike';
import {
  BIKE_FORM_DEFAULT_DIMENSIONS,
  BikeFormComponent,
} from '../bike-form/bike-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeComponent {
  bikeType = BikeType;

  bikeId = '';

  bikeData$: Observable<Bike> = this.route.params.pipe(
    map((p) => p['id']),
    tap((id) => (this.bikeId = id)),
    switchMap((id) => this.bikeService.get(id ?? ''))
  );

  constructor(
    private route: ActivatedRoute,
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

  onUpdate(bikeId: string, bike: Bike) {
    this.openDialog(bike).subscribe((result) => {
      if (result) {
        this.bikeService.update(bikeId, result);
        this.openSnackBar(`Bike with bikeId: ${bikeId} updated`);
      }
    });
  }
}
