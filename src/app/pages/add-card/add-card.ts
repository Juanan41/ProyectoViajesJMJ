import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, CreditCard as CardIcon } from 'lucide-angular';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './add-card.html',
})
export class AddCard {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

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
      this.cardHolder.trim().length > 0
    );
  }

  handleAddCard(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    if (this.isValid) {
      this.isLoading = true;

      try {
        const payload = {
          titular: this.cardHolder,
          iban: this.cardNumber.replace(/\s+/g, ''),
          entidad: 'TARJETA ' + this.expiry,
          swift_bic: this.cvv,
          swiftBic: this.cvv,
          activa: true,
        };

        this.authService.agregarTarjeta(payload).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/settings']);
          },
          error: (err) => {
            this.isLoading = false;
            if (err.status === 403 || err.status === 401) {
              this.errorMessage = 'Sesión caducada. Por favor, vuelve a iniciar sesión.';
            } else if (err.error && typeof err.error === 'string') {
              this.errorMessage = err.error;
            } else {
              this.errorMessage = 'Error en el servidor al intentar guardar la tarjeta.';
            }
          },
        });
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = 'Error interno en la aplicación.';
      }
    } else {
      this.errorMessage = 'Por favor, revise los datos de la tarjeta.';
    }
  }
}
