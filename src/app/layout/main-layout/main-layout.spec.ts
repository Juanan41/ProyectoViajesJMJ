// ProyectoViajesJMJ - layout\main-layout\main-layout.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayout } from './main-layout';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
