import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BikeService } from 'src/app/bike.service';
import { Bike, BikeType } from 'src/app/domain/bike';
import { BikeFormComponent } from '../bike-form/bike-form.component';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeComponent {
  bikeType = BikeType;

  bikeData$: Observable<Bike> = this.route.params.pipe(
    map((p) => p['id']),
    switchMap((id) => this.bikeService.get(id ?? ''))
  );

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private bikeService: BikeService
  ) {}

  openDialog(bike: Bike): void {
    const dialogRef = this.dialog.open(BikeFormComponent, {
      height: '600px',
      width: '800px',
      data: { bike: bike },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onCreate(bike: Bike) {
    console.log(bike);
    console.log('onCreate clicked');
    this.openDialog(bike);
  }

  onUpdate(bike: Bike) {
    console.log('onUpdate clicked');
  }

  onDelete(bike: Bike) {
    console.log('onDelete clicked');
  }
}
