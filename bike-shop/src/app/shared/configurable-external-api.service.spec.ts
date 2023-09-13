import { TestBed } from '@angular/core/testing';

import { ConfigurableExternalApiService } from './configurable-external-api.service';

describe('ConfigurableExternalApiService', () => {
  let service: ConfigurableExternalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurableExternalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
