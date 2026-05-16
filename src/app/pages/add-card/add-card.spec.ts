// ProyectoViajesJMJ - pages\add-card\add-card.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCard } from './add-card';

describe('AddCard', () => {
  let component: AddCard;
  let fixture: ComponentFixture<AddCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
