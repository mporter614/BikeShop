import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from 'src/app/bike.service';
import { Bike, BikeType } from 'src/app/domain/bike';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
})
export class BikeComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    //Experiment to simplify the form group definitions / not bog them down with initialization
    const bikeId = this.route.snapshot.paramMap.get('id');
    console.log('bikeId from route params', bikeId);
    this.bikeService.get(bikeId ?? '').subscribe((res) => {
      console.log(res);
      this.bikeData = res ?? null;
      this.bikeForm.patchValue({ ...this.bikeData });
    });
  }

  onSubmit() {
    // TODO: emit + consume form data in parent component
    console.log(this.bikeForm.value);
  }
}
