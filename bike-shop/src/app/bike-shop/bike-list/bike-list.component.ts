import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Bike, BikeType } from '../../domain/bike';
import { BikeService } from 'src/app/bike.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeListComponent {
  bikes$: Observable<Bike[]> = this.bikeService.getAll();

  constructor(private bikeService: BikeService) {}
}
