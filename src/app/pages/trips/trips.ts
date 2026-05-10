import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Calendar,
  MapPin,
  Plane,
  ArrowRight,
  History,
  Trash2,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { ReservaService, ReservaResponse } from '../../services/reserva.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './trips.html',
})
export class Trips implements OnInit {
  private auth = inject(Auth);
  private reservaService = inject(ReservaService);

  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly PlaneIcon = Plane;
  readonly ArrowRightIcon = ArrowRight;
  readonly HistoryIcon = History;
  readonly TrashIcon = Trash2;

  trips = signal<ReservaResponse[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadUserTrips();
  }

  loadUserTrips() {
    if (!this.auth.isLoggedIn()) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.reservaService.getMisReservas().subscribe({
      next: (data) => {
        this.trips.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando viajes:', err);
        this.isLoading.set(false);
      },
    });
  }

  getStatusClass(estado: string): string {
    const s = estado?.toUpperCase();
    if (s === 'CONFIRMADA' || s === 'COMPLETADA')
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (s === 'PENDIENTE') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (s === 'CANCELADA') return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }

  cancelTrip(id: number) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(id).subscribe({
        next: () => {
          this.loadUserTrips();
        },
        error: (err) => console.error('Error al cancelar la reserva:', err),
      });
    }
  }
}
