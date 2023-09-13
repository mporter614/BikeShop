import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Bike, BikeType } from '../../domain/bike';
import { BikeService } from 'src/app/bike.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BikeFormComponent } from '../bike-form/bike-form.component';
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
      height: '600px',
      width: '800px',
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

  onDelete(bikeId: string) {
    console.log('onDelete clicked');
    console.log('calling delete for bike:', bikeId);
    this.bikeService.delete(bikeId);
  }
}
