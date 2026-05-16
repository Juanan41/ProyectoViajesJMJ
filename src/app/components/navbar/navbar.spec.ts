// ProyectoViajesJMJ - components\navbar\navbar.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
