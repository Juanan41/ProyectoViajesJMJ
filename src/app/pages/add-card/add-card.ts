import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, CreditCard, ArrowLeft, Lock } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './add-card.html',
})
export class AddCard {
  titular = '';
  numeroTarjeta = '';
  fechaExpiracion = '';
  cvv = '';

  isLoading = signal(false);
  errorMessage = signal('');

  readonly CreditCardIcon = CreditCard;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly LockIcon = Lock;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault();

    if (!this.titular || !this.numeroTarjeta || !this.fechaExpiracion || !this.cvv) {
      this.errorMessage.set('Rellena todos los campos');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload = {
      titular: this.titular,
      numeroTarjeta: this.numeroTarjeta.replace(/\s+/g, ''),
      fechaExpiracion: this.fechaExpiracion,
      cvv: this.cvv,
    };

    this.auth.agregarTarjeta(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/settings']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al guardar la tarjeta. Comprueba los datos.');
        console.error(err);
      },
    });
  }
}
