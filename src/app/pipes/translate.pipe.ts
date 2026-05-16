// ProyectoViajesJMJ - pipes\translate.pipe.ts
// Responsabilidad: traducciones, normalizacion de textos y soporte bilingue.
// Nota profesional: Mantiene textos traducibles y normalizacion para que ES/EN funcionen sin romper nombres propios.

import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation';

/**
 * Documento profesional: clase principal del archivo.
 * Mantiene textos traducibles y normalizacion para que ES/EN funcionen sin romper nombres propios.
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(key: string | null | undefined): string {
    if (!key) return '';
    return this.translationService.translate(key);
  }
}
