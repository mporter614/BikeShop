import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { BikeService } from 'src/app/bike.service';
import { Bike, BikeType } from 'src/app/domain/bike';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeComponent implements OnInit {
  bikeType = BikeType;
  typeEnumKeys: number[];

  bikeForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    type: [0, Validators.required],
    //Rating is a derived field from reviews, not present in form
    //rating: 0,
    photoUrl: [''],
  });

  bikeData!: Bike | null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bikeService: BikeService
  ) {
    console.log(Object.keys(this.bikeType));
    this.typeEnumKeys = Object.keys(this.bikeType)
      .filter((f) => !isNaN(Number(f)))
      .map(Number);
    //this.enumKeys = this.enumKeys.map(key => Number(key));
    console.log(this.typeEnumKeys);
  }

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
          this.bikeForm.patchValue({ ...this.bikeData });
          //this.selectedBikeType = this.bikeData?.type;
        })
      )
      .subscribe();
  }

  onSubmit() {
    // TODO: emit + consume form data in parent component
    console.log(this.bikeForm.value);
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
