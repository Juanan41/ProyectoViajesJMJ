// ProyectoViajesJMJ - components\pantalla_carga\pantalla_carga.ts
// Responsabilidad: pieza de soporte usada por la aplicacion ProyectoViajesJMJ.
// Nota profesional: Modulo de soporte del proyecto; revisar dependencias antes de cambiar su contrato publico.

import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Documento profesional: clase principal del archivo.
 * Modulo de soporte del proyecto; revisar dependencias antes de cambiar su contrato publico.
 */
@Component({
  selector: 'app-pantalla-carga',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pantalla_carga.html',
  styleUrl: './pantalla_carga.css',
})
export class PantallaCargaComponent {

}
