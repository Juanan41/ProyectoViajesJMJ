// ProyectoViajesJMJ - pages\cities\cities.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cities } from './cities';

describe('Cities', () => {
  let component: Cities;
  let fixture: ComponentFixture<Cities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cities],
    }).compileComponents();

    fixture = TestBed.createComponent(Cities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
