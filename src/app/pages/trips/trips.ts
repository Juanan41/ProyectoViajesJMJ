// ProyectoViajesJMJ - pages\trips\trips.ts
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Calendar,
  MapPin,
  Plane,
  PlaneTakeoff,
  Train,
  Ship,
  ArrowRight,
  History,
  Trash2,
  X,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { ReservaService, ReservaResponse } from '../../services/reserva.service';
import { TicketData, TicketService } from '../../services/ticket.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { catchError, of } from 'rxjs';

/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './trips.html',
})
export class Trips implements OnInit {
  private auth = inject(Auth);
  private reservaService = inject(ReservaService);
  private ticketService = inject(TicketService);

  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly PlaneIcon = Plane;
  readonly PlaneTakeoffIcon = PlaneTakeoff;
  readonly TrainIcon = Train;
  readonly ShipIcon = Ship;
  readonly ArrowRightIcon = ArrowRight;
  readonly HistoryIcon = History;
  readonly TrashIcon = Trash2;
  readonly XIcon = X;

  trips = signal<ReservaResponse[]>([]);
  isLoading = signal(true);

  selectedTripToCancel = signal<ReservaResponse | null>(null);
  selectedTicket = signal<ReservaResponse | null>(null);

  isCancelling = signal(false);
  cancelError = signal('');

  activeTrips = computed(() =>
    this.trips().filter((trip) => trip.estado !== 'CANCELADA' && !this.isCompleted(trip)),
  );

  completedTrips = computed(() =>
    this.trips().filter((trip) => trip.estado !== 'CANCELADA' && this.isCompleted(trip)),
  );

  canceledTrips = computed(() => this.trips().filter((trip) => trip.estado === 'CANCELADA'));

  ngOnInit() {
    this.loadUserTrips();
  }

  loadUserTrips() {
    if (!this.auth.isLoggedIn()) {
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);

    this.reservaService
      .getMisReservas()
      .pipe(
        catchError((err) => {
          console.error('Error cargando viajes:', err);
          return of([]);
        }),
      )
      .subscribe({
        next: (trips) => {
          this.trips.set(trips);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error cargando trips:', err);
          this.isLoading.set(false);
        },
      });
  }

  getHotelRoute(trip: ReservaResponse): any[] {
    return ['/hotel', trip.alojamientoId];
  }

  getStatusClass(estado: string): string {
    const s = (estado || '').toUpperCase();

    if (s === 'CONFIRMADA' || s === 'COMPLETADA') {
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }

    if (s === 'PENDIENTE') {
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }

    if (s === 'CANCELADA') {
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    }

    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }

  openTicket(trip: ReservaResponse) {
    this.selectedTicket.set(trip);
  }

  closeTicket() {
    this.selectedTicket.set(null);
  }

  getTicketData(trip: ReservaResponse | null | undefined): TicketData {
    return this.ticketService.getTicketData(trip);
  }

  getTransportIcon(type: string | undefined | null) {
    const normalized = (type || '').toLowerCase();

    if (normalized.includes('tren')) return this.TrainIcon;
    if (normalized.includes('barco')) return this.ShipIcon;

    return this.PlaneTakeoffIcon;
  }

  get userName(): string {
    return this.auth.user()?.name || 'Pasajero';
  }

  formatTicketDate(value: string | undefined | null): string {
    if (!value) return '';

    const date = new Date(value);

    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  askCancelTrip(trip: ReservaResponse) {
    this.cancelError.set('');
    this.selectedTripToCancel.set(trip);
  }

  closeCancelModal() {
    if (this.isCancelling()) return;

    this.cancelError.set('');
    this.selectedTripToCancel.set(null);
  }

  confirmCancelTrip() {
    const trip = this.selectedTripToCancel();

    if (!trip || this.isCancelling()) return;

    this.isCancelling.set(true);
    this.cancelError.set('');

    this.reservaService.cancelarReserva(trip.id).subscribe({
      next: () => {
        this.isCancelling.set(false);
        this.selectedTripToCancel.set(null);
        this.loadUserTrips();
      },
      error: (err) => {
        console.error('Error al cancelar la reserva:', err);
        this.isCancelling.set(false);
        this.cancelError.set('No se pudo cancelar la reserva. Inténtalo de nuevo.');
      },
    });
  }

  private isCompleted(trip: ReservaResponse): boolean {
    if (!trip.checkOut) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkOut = new Date(trip.checkOut);
    checkOut.setHours(0, 0, 0, 0);

    return checkOut < today;
  }
}
