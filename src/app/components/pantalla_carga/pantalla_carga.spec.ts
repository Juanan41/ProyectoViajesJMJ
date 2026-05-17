import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallaCargaComponent } from './pantalla_carga';

describe('PantallaCargaComponent', () => {
  let component: PantallaCargaComponent;
  let fixture: ComponentFixture<PantallaCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaCargaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallaCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
