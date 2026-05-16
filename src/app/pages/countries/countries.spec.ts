// ProyectoViajesJMJ - pages\countries\countries.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countries } from './countries';

describe('Countries', () => {
  let component: Countries;
  let fixture: ComponentFixture<Countries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Countries],
    }).compileComponents();

    fixture = TestBed.createComponent(Countries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
