import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const API_ENDPOINT_TOKEN = new InjectionToken<string>(
  'ApiEndpointToken'
);

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
    return this.http.get(this.config);
  }
}
