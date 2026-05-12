import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, CreditCard, Trash2, Plus, ArrowLeft } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  public authService = inject(Auth);

  readonly CreditCardIcon = CreditCard;
  readonly TrashIcon = Trash2;
  readonly PlusIcon = Plus;
  readonly ArrowLeftIcon = ArrowLeft;

  tarjetas = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.isLoading.set(true);
    this.authService.obtenerTarjetas().subscribe({
      next: (data) => {
        this.tarjetas.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando tarjetas', err);
        this.isLoading.set(false);
      },
    });
  }

  removeCard() {
    if (confirm('¿Seguro que quieres borrar esta tarjeta de tu cuenta?')) {
      this.authService.borrarTarjeta().subscribe({
        next: () => this.loadCards(),
        error: (err) => console.error('Error borrando tarjeta', err),
      });
    }
  }
}
