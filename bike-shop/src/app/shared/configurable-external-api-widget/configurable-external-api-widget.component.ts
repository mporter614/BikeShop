import { Component, Inject, InjectionToken } from '@angular/core';

//export const API_ENDPOINT_TOKEN = new InjectionToken<string>('test');
@Component({
  selector: 'app-configurable-external-api-widget',
  templateUrl: './configurable-external-api-widget.component.html',
  styleUrls: ['./configurable-external-api-widget.component.scss'],
})

//Simple widget to fetch data from a configurable endpoint, pass the data to a child component for rendering
export class ConfigurableExternalApiWidgetComponent {
  //public constructor(@Inject(API_ENDPOINT_TOKEN) private config: string) {
  //console.log(API_ENDPOINT_TOKEN);
  //}
}
