// ProyectoViajesJMJ - components\destino-carousel\destino-carousel.spec.ts
// Responsabilidad: pruebas automatizadas que protegen el comportamiento esperado de este modulo.
// Nota profesional: Define pruebas de regresion para que los cambios futuros mantengan el contrato del modulo.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoCarousel } from './destino-carousel';

describe('DestinoCarousel', () => {
  let component: DestinoCarousel;
  let fixture: ComponentFixture<DestinoCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinoCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
