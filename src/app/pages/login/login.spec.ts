// ProyectoViajesJMJ - pages\login\login.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
