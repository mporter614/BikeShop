import { Injectable } from '@angular/core';
import { Bike } from './domain/bike';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';

import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BikeService {
  //Since I wanted to stick to Angular and not cross into backend / database work for the purposes of this exercise,
  //decided to keep a rudimentory cache here which is manipulated via the CRUD service methods.
  //Will be able to swap into actually calling backends in professional setting easily via
  //adjusting the service implementation(s), and not necessary to update any other layer of the application,
  //as the methods are written to return Observables as would be the case in production quality service code.

  //Using https://dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8 implementation to achieve
  //Redux-like functionality with minimal boilerplate

  private readonly _bikes = new BehaviorSubject<Bike[]>([]);

  //Expose as observable to prevent writes by consumers to the subject
  readonly bikes$ = this._bikes.asObservable();

  //Getter and setter allow for easier redux-like updates below in service methods(working with underlying data retrieved from our Subject instead of observables)
  get bikes(): Bike[] {
    return this._bikes.getValue();
  }

  private set bikes(bikes: Bike[]) {
    this._bikes.next(bikes);
  }

  constructor(private http: HttpClient) {
    //Initializing via .json file for ease of starting development independent of back-end
    this.http
      .get<Bike[]>('../assets/data-stubs/bikes.json')
      .subscribe((res) => {
        this.bikes = res;
        console.log('initial Bikes: ', this.bikes);
      });
  }

  getAll(): Observable<Bike[]> {
    return this.bikes$;
  }

  //Filtering out undefined to get rid of initial empty state of BehaviorSubject above
  get(id: string): Observable<Bike> {
    return this.bikes$.pipe(
      map((bikes) => bikes.filter((bike) => bike.id === id)[0]),
      filter((res) => res !== undefined)
    );
  }

  create(bikeData: Bike) {
    this.bikes = [
      ...this.bikes,
      { ...bikeData, id: String(this.bikes.length + 1) },
    ];
  }

  update(id: string, bikeData: Bike) {
    let bikeToUpdate = this.bikes.find((bike) => bike.id === id);

    if (bikeToUpdate) {
      const index = this.bikes.indexOf(bikeToUpdate);
      this.bikes[index] = { ...bikeToUpdate, ...bikeData };

      this.bikes = [...this.bikes];
    }
  }

  delete(id: string) {
    this.bikes = this.bikes.filter((bike) => bike.id !== id);
  }
}
