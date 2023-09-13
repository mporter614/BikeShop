import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bike, BikeType } from 'src/app/domain/bike';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bike-form',
  templateUrl: './bike-form.component.html',
  styleUrls: ['./bike-form.component.scss'],
})
export class BikeFormComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BikeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bike: Bike }
  ) {
    //Adjusting enum of bikeType to be able to show strings on UI
    this.typeEnumKeys = Object.keys(this.bikeType)
      .filter((f) => !isNaN(Number(f)))
      .map(Number);
  }
  ngOnInit(): void {
    //read bike data from input
    if (this.data?.bike) {
      this.bikeForm.patchValue({ ...this.data?.bike });
    }
  }

  onSubmit() {
    // TODO: emit + consume form data in parent component
    console.log(this.bikeForm.value);
    this.dialogRef.close(this.bikeForm.value);
  }
}
