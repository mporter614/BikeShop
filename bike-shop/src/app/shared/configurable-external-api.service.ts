import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export const API_ENDPOINT_TOKEN = new InjectionToken<string>(
  'ApiEndpointToken'
);

//Currently hard coding here to show 6 temperatures in UI
const NUMBER_OF_TEMPS = 6;

@Injectable({
  providedIn: 'root',
})
//Simple service to fetch data from a configurable endpoint
export class ConfigurableExternalApiService {
  public constructor(
    @Inject(API_ENDPOINT_TOKEN) private config: string,
    private http: HttpClient
  ) {}

  public get(): Observable<Object> {
    console.log(this.config);

    return this.http.get(this.config);
  }
}
