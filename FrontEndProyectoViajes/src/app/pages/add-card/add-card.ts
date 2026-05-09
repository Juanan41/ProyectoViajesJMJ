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
  styleUrl: './add-card.css',
})
export class AddCard {
  constructor(
    private authService: Auth,
    private router: Router,
  ) { }

  readonly ArrowLeftIcon = ArrowLeft;
  readonly CardIconType = CardIcon;

  cardNumber = '';
  cardHolder = '';
  expiry = '';
  cvv = '';

  private onlyDigits(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }

  formatCardNumber(value: string): string {
    const digits = this.onlyDigits(value).substring(0, 16);
    const matches = digits.match(/\d{1,4}/g);
    if (matches && matches.length) {
      return matches.join(' ');
    }
    return value;
  }

  formatExpiry(value: string): string {
    const digits = this.onlyDigits(value);
    if (digits.length >= 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  }

  handleCardNumberChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const formatted = this.formatCardNumber(value);
    if (formatted.length <= 19) {
      this.cardNumber = formatted;
      input.value = formatted;
    } else {
      this.cardNumber = formatted.substring(0, 19);
      input.value = this.cardNumber;
    }
  }

  handleExpiryChange(value: string) {
    const formatted = this.formatExpiry(value);
    if (formatted.length <= 5) {
      this.expiry = formatted;
    } else {
      this.expiry = formatted.substring(0, 5);
    }
  }

  handleCvvChange(value: string) {
    const digits = this.onlyDigits(value);
    if (digits.length <= 4) {
      this.cvv = digits;
    } else {
      this.cvv = digits.substring(0, 4);
    }
  }

  get isValid(): boolean {
    const cleanNumber = this.cardNumber.replace(/\s+/g, '');
    const isNumberValid = /^\d{16}$/.test(cleanNumber);
    const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiry);
    const isCvvValid = /^\d{3,4}$/.test(this.cvv);
    const isNameValid = this.cardHolder.trim().length > 0;
    return isNumberValid && isExpiryValid && isCvvValid && isNameValid;
  }

  handleAddCard(event: Event) {
    event.preventDefault();

    if (this.isValid) {
      const cleanNumber = this.cardNumber.replace(/\s+/g, '');
      this.authService.addCard({
        last4: cleanNumber.slice(-4),
        holder: this.cardHolder,
        expiry: this.expiry,
      });
      this.router.navigate(['/settings']);
    } else {
      alert(
        'Por favor, revise los datos de la tarjeta. Asegúrese de introducir 16 dígitos, un mes válido en caducidad (MM/YY) y su código de seguridad.',
      );
    }
  }
}

