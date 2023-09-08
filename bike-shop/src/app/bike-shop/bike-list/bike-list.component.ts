import { Component } from '@angular/core';
import { Bike, BikeType } from '../../domain/bike';
@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss'],
})
export class BikeListComponent {
  bikes: Bike[] = [
    {
      id: '000-012309',
      description: 'test bike 1',
      price: 23.79,
      quantity: 4,
      type: BikeType.Pennyfarthing,
      rating: 9.5,
      photoUrl: '',
    },
    {
      id: '000-012310',
      description: 'test bike 2',
      price: 48.88,
      quantity: 1,
      type: BikeType.Tandem,
      rating: 7.99,
      photoUrl: '',
    },
  ];
}
