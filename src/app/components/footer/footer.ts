// ProyectoViajesJMJ - components\footer\footer.ts
// Responsabilidad: estructura global de navegacion, layout y composicion de la aplicacion.
// Nota profesional: Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

type FooterModal = 'privacy' | 'terms' | 'contact' | null;

/**
 * Documento profesional: clase principal del archivo.
 * Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './footer.html',
})
export class Footer {
  activeModal = signal<FooterModal>(null);

  openModal(modal: Exclude<FooterModal, null>) {
    this.activeModal.set(modal);
  }

  closeModal() {
    this.activeModal.set(null);
  }
}
