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
