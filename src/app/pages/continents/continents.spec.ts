// ProyectoViajesJMJ - pages\continents\continents.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Continents } from './continents';

describe('Continents', () => {
  let component: Continents;
  let fixture: ComponentFixture<Continents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Continents],
    }).compileComponents();

    fixture = TestBed.createComponent(Continents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
