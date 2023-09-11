import { Injectable } from '@angular/core';
import { Bike } from './domain/bike';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  //Since I wanted to stick to Angular and not cross into backend / database work for the purposes of this exercise,
  //decided to keep a rudimentory cache here which is manipulated via the CRUD service methods.
  //Will be able to swap into actually calling backends in professional setting easily via
  //adjusting the service implementation(s), and not necessary to update any other layer of the application,
  //as the methods are written to return Observables as would be the case in production quality service code.

  //TODO: simplify the object/subject here, have the object for convenience for create/update/delete actions,
  //but there is a method to update the subject somewhere to achieve the same
  private _bikePseudoCache: Bike[] = [];

  bikes$ = new BehaviorSubject<Bike[]>([]);

  constructor(private http: HttpClient) {
    //Initializing via .json file for ease of starting development independent of back-end
    this.http
      .get<Bike[]>('../assets/data-stubs/bikes.json')
      .subscribe((res) => {
        this._bikePseudoCache = res;
        console.log('initial Bikes: ', this._bikePseudoCache);
        this.bikes$.next(this._bikePseudoCache);
      });
  }

  getAll(): Observable<Bike[]> {
    return this.bikes$;
  }

  get(id: string) {}

  create() {}

  update(id: string) {}

  delete(id: string) {}
}
