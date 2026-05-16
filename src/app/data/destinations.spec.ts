// ProyectoViajesJMJ - data\destinations.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

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
