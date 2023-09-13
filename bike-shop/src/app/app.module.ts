import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_ENDPOINT_TOKEN } from './shared/configurable-external-api.service';

// Found this free government API at https://www.weather.gov/documentation/services-web-api
// and queried https://api.weather.gov/points/36.0395,-114.9817 for Henderson, NV forecast endpoint
const HENDERSON_NV_WEATHERDOTGOV_ENDPOINT =
  'https://api.weather.gov/gridpoints/VEF/127,91/forecast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: API_ENDPOINT_TOKEN,
      useValue: HENDERSON_NV_WEATHERDOTGOV_ENDPOINT,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
