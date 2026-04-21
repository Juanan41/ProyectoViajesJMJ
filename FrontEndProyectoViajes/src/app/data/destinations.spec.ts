import { TestBed } from '@angular/core/testing';

import { getCitiesByCountry, getCountriesByContinent, continents } from './destinations';

describe('Destinations', () => {
  let service: Destinations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Destinations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
