import { Injectable } from '@angular/core';
import { Bike } from './domain/bike';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';

import { map } from 'rxjs/operators';
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

  //Getter and setter allow for easier redux-like updates below in service methods(working with underlying data instead of observables)
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

  //Ugly typing here, would handle on API side by returning empty response and mapping accordingly
  get(id: string): Observable<Bike | undefined> {
    return this.bikes$.pipe(
      map((bikes) => bikes.filter((bike) => bike.id === id)[0])
    );
  }

  create() {}

  update(id: string) {}

  delete(id: string) {}
}
