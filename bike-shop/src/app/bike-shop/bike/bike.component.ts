import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { BikeService } from 'src/app/bike.service';
import { Bike } from 'src/app/domain/bike';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeComponent implements OnInit {
  bikeData!: Bike | null;

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService
  ) {}

  ngOnInit(): void {
    //Experiment to simplify the form group definitions / not bog them down with initialization
    const bikeId = this.route.snapshot.paramMap.get('id');
    console.log('bikeId from route params', bikeId);

    this.bikeService
      .get(bikeId ?? '')
      .pipe(
        //Side effect from the service bike data not being ready when accessing individual bike page (refresh or direct URL access) that undefined is emitted
        //Ideally fix this when moving to consuming actual API / or state management pattern - BehaviorSubject initial value is root cause
        filter((res) => res !== undefined),
        tap((bike) => {
          console.log(bike);
          this.bikeData = bike ?? null;
          //this.bikeForm.patchValue({ ...this.bikeData });
          //this.selectedBikeType = this.bikeData?.type;
        })
      )
      .subscribe();
  }

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
