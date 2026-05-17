import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pantalla-carga',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pantalla_carga.html',
  styleUrl: './pantalla_carga.css',
})
export class PantallaCargaComponent {}
