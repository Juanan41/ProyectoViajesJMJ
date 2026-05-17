import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, CreditCard, Trash2, Plus, ArrowLeft } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { finalize } from 'rxjs';

interface SettingsNotice {
  type: 'success' | 'error';
  title: string;
  message: string;
}

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
  isDeleting = signal(false);

  showDeleteCardConfirm = signal(false);
  notice = signal<SettingsNotice | null>(null);

  ngOnInit() {
  const token = localStorage.getItem('token');

  if (token) {
    this.loadCards();
  } else {
    this.tarjetas.set([]);
    this.isLoading.set(false);
  }
}

  loadCards() {
    this.isLoading.set(true);
    this.authService.obtenerTarjetas().subscribe({
      next: (data) => {
        this.tarjetas.set(data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando tarjetas', err);
        this.isLoading.set(false);
      },
    });
  }

  removeCard() {
    this.showDeleteCardConfirm.set(true);
  }

  cancelRemoveCard() {
    if (this.isDeleting()) return;
    this.showDeleteCardConfirm.set(false);
  }

  confirmRemoveCard() {
    this.isDeleting.set(true);

    this.authService
      .borrarTarjeta()
      .pipe(finalize(() => this.isDeleting.set(false)))
      .subscribe({
        next: () => {
          this.tarjetas.set([]);
          this.showDeleteCardConfirm.set(false);

          this.authService.credits.set(0);
          this.authService.updateUser({ saldo: 0 });

          this.notice.set({
            type: 'success',
            title: 'Tarjeta eliminada',
            message: 'La tarjeta se ha eliminado correctamente y tu saldo se ha puesto a 0.',
          });
        },
        error: (err) => {
          console.error('Error borrando tarjeta', err);
          this.showDeleteCardConfirm.set(false);
          this.notice.set({
            type: 'error',
            title: 'No se pudo eliminar la tarjeta',
            message: 'Ha ocurrido un error al borrar la tarjeta. Inténtalo de nuevo.',
          });
        },
      });
  }

  closeNotice() {
    this.notice.set(null);
  }
}
