import { getCitiesByCountry, getCountriesByContinent, continents } from './destinations';

describe('Destinations', () => {
  it('should expose continents data', () => {
    expect(continents.length).toBeGreaterThan(0);
  });

  it('should return countries for an existing continent', () => {
    const countries = getCountriesByContinent('europe');
    expect(countries.length).toBeGreaterThan(0);
  });

  it('should return cities for an existing country', () => {
    const cities = getCitiesByCountry('france');
    expect(cities.length).toBeGreaterThan(0);
  });
});
