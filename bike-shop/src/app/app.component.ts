import { Component, OnInit } from '@angular/core';
import { ConfigurableExternalApiService } from './shared/configurable-external-api.service';
import { map } from 'rxjs';

const NUMBER_OF_TEMPS = 6;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  weatherData$ = this.apiService.get().pipe(
    map((res: any) => {
      const weatherData = res['properties'] ?? [];
      const temps = weatherData['periods'] ?? [];

      //Returning tuple with (day, temp) strings
      let output: [string, string][] = [];
      temps.forEach((currentValue: { [x: string]: string }, index: number) => {
        if (index < NUMBER_OF_TEMPS) {
          output.push([currentValue['name'], currentValue['temperature']]);
        }
      });

      return output;
    })
  );
  constructor(private apiService: ConfigurableExternalApiService) {}

  ngOnInit(): void {}

  title = "Mark's Bike Shop";
}
