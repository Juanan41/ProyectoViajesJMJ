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
