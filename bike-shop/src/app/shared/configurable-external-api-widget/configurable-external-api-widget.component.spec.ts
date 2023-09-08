import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableExternalApiWidgetComponent } from './configurable-external-api-widget.component';

describe('ConfigurableExternalApiWidgetComponent', () => {
  let component: ConfigurableExternalApiWidgetComponent;
  let fixture: ComponentFixture<ConfigurableExternalApiWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurableExternalApiWidgetComponent]
    });
    fixture = TestBed.createComponent(ConfigurableExternalApiWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
