import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, CreditCard as CardIcon } from 'lucide-angular';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './add-card.html',
})
export class AddCard {
  private authService = inject(Auth);
  private router = inject(Router);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly CardIconType = CardIcon;

  cardNumber = '';
  cardHolder = '';
  expiry = '';
  cvv = '';
  errorMessage = '';
  isLoading = false;

  private onlyDigits(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }

  private onlyLettersAndSpaces(value: string): string {
    return value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, '');
  }

  private isValidCardHolder(value: string): boolean {
    return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(value.trim());
  }

  formatCardNumber(value: string): string {
    const digits = this.onlyDigits(value).substring(0, 16);
    const matches = digits.match(/\d{1,4}/g);
    return matches ? matches.join(' ') : value;
  }

  formatExpiry(value: string): string {
    const digits = this.onlyDigits(value);
    return digits.length >= 2 ? `${digits.substring(0, 2)}/${digits.substring(2, 4)}` : digits;
  }



  handleCardNumberChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatCardNumber(input.value);
    this.cardNumber = formatted.substring(0, 19);
    input.value = this.cardNumber;
  }

  handleCardHolderChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cardHolder = this.onlyLettersAndSpaces(input.value);
    input.value = this.cardHolder;
  }

  handleExpiryChange(value: string) {
    this.expiry = this.formatExpiry(value).substring(0, 5);
  }

  handleCvvChange(value: string) {
    this.cvv = this.onlyDigits(value).substring(0, 4);
  }

  get isValid(): boolean {
    const cleanNumber = this.cardNumber.replace(/\s+/g, '');

    return (
      /^\d{16}$/.test(cleanNumber) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiry) &&
      /^\d{3,4}$/.test(this.cvv) &&
      this.isValidCardHolder(this.cardHolder)
    );
  }

  handleAddCard() {
    if (!this.isValid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      titular: this.cardHolder,
      iban: this.cardNumber.replace(/\s+/g, ''),
      entidad: 'TARJETA ' + this.expiry,
      swiftBic: this.cvv,
      activa: true,
    };

    this.authService
      .agregarTarjeta(payload)
      .pipe(
        timeout(10000),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: () => this.router.navigate(['/settings']),
        error: (err) => {
          if (err.name === 'TimeoutError') {
            this.errorMessage =
              'El servidor no ha respondido. Comprueba que el backend está arrancado.';

          } else if (err.status === 0) {
            this.errorMessage = 'No se puede conectar con el backend.';

          } else if (err.status === 403) {
            this.errorMessage = 'No tienes permiso o tu sesión ha caducado.';

          } else if (err.status === 400) {
            const mensajeBackend =
              typeof err.error === 'string'
                ? err.error
                : err?.error?.message || err?.error?.error;

            this.errorMessage =
              mensajeBackend || 'Solo puedes tener un máximo de 2 tarjetas.';

          } else {
            const mensajeBackend =
              typeof err.error === 'string'
                ? err.error
                : err?.error?.message || err?.error?.error;

            this.errorMessage =
              mensajeBackend ||
              err?.message ||
              'Error al guardar la tarjeta. Revisa los datos.';
          }
        },
      });
  }
}
