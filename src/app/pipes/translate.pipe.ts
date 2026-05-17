import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string | null | undefined): string {
    if (!key) return '';
    return this.translationService.translate(key);
  }
}
