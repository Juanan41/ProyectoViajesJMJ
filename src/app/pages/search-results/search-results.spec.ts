// ProyectoViajesJMJ - pages\search-results\search-results.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResults } from './search-results';

describe('SearchResults', () => {
  let component: SearchResults;
  let fixture: ComponentFixture<SearchResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResults],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
