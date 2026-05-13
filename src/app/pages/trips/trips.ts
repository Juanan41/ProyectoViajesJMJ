import { Component, OnInit, inject, signal, computed } from '@angular/core';
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
  Star,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { ReservaService, ReservaResponse } from '../../services/reserva.service';
import { OpinionDTO, OpinionService } from '../../services/opinion.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './trips.html',
})
export class Trips implements OnInit {
  private auth = inject(Auth);
  private reservaService = inject(ReservaService);
  private opinionService = inject(OpinionService);

  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly PlaneIcon = Plane;
  readonly ArrowRightIcon = ArrowRight;
  readonly HistoryIcon = History;
  readonly TrashIcon = Trash2;
  readonly StarIcon = Star;

  trips = signal<ReservaResponse[]>([]);
  reviews = signal<OpinionDTO[]>([]);
  activeTrips = computed(() => this.trips().filter((t) => t.estado !== 'CANCELADA'));
  canceledTrips = computed(() => this.trips().filter((t) => t.estado === 'CANCELADA'));
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
    forkJoin({
      trips: this.reservaService.getMisReservas().pipe(
        catchError((err) => {
          console.error('Error cargando viajes:', err);
          return of([]);
        }),
      ),
      reviews: this.opinionService.getMisOpiniones().pipe(
        catchError((err) => {
          console.error('Error cargando resenas:', err);
          return of([]);
        }),
      ),
    }).subscribe({
      next: ({ trips, reviews }) => {
        this.trips.set(trips);
        this.reviews.set(reviews);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando trips:', err);
        this.isLoading.set(false);
      },
    });
  }


  getStatusClass(estado: string): string {
    const s = estado.toUpperCase();
    if (s === 'CONFIRMADA' || s === 'COMPLETADA')
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (s === 'PENDIENTE') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (s === 'CANCELADA') return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }

  getArray(length: number): any[] {
    return Array.from({ length: length || 0 });
  }

  cancelTrip(id: number) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva')) {
      this.reservaService.cancelarReserva(id).subscribe({
        next: () => {
          this.loadUserTrips();
        },
        error: (err) => console.error('Error al cancelar la reserva:', err),
      });
    }
  }
}
