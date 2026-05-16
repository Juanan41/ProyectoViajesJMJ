// ProyectoViajesJMJ - pages\receipt\receipt.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Receipt } from './receipt';

describe('Receipt', () => {
  let component: Receipt;
  let fixture: ComponentFixture<Receipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Receipt],
    }).compileComponents();

    fixture = TestBed.createComponent(Receipt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
