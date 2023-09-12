import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  bikeData: Bike = {
    id: '10983-12313',
    name: 'Bikey bikerson',
    description: 'cool bike',
    price: 100.77,
    quantity: 23,
    type: BikeType.Tandem,
    rating: 0,
    photoUrl: '',
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Experiment to simplify the form group definitions / not bog them down with initialization
    this.bikeForm.patchValue({ ...this.bikeData });
  }

  onSubmit() {
    // TODO: emit + consume form data in parent component
    console.log(this.bikeForm.value);
  }
}
