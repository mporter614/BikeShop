import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BikeService } from 'src/app/bike.service';
import { Bike } from 'src/app/domain/bike';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeComponent {
  bikeData$: Observable<Bike> = this.route.params.pipe(
    map((p) => p['id']),
    switchMap((id) => this.bikeService.get(id ?? ''))
  );

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService
  ) {}

  onCreate() {
    console.log('onCreate clicked');
  }

  onUpdate() {
    console.log('onUpdate clicked');
  }

  onDelete() {
    console.log('onDelete clicked');
  }
}
