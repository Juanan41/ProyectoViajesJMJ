import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  MapPin,
  Calendar,
  PlaneTakeoff,
  BedDouble,
  CheckCircle2,
  Clock,
  X,
  Train,
  Ship,
  Star,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { TranslationService } from '../../services/translation';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ReservaService, ReservaResponse } from '../../services/reserva.service';
import { OpinionDTO, OpinionService } from '../../services/opinion.service';
import { catchError, forkJoin, of } from 'rxjs';

export interface Trip {
  bookingId: string;
  id: string;
  hotelId: string;
  destination: string;
  date: string;
  hotel: string;
  image: string;
  bookingDate: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
  estado: string;
  transport: {
    type: string;
    name: string;
    time: string;
    seat: string;
    gate: string;
  } | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(Auth);
  private translationService = inject(TranslationService);
  private reservaService = inject(ReservaService);
  private opinionService = inject(OpinionService);
  private router = inject(Router);

  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly PlaneTakeoffIcon = PlaneTakeoff;
  readonly BedDoubleIcon = BedDouble;
  readonly CheckCircle2Icon = CheckCircle2;
  readonly ClockIcon = Clock;
  readonly XIcon = X;
  readonly TrainIcon = Train;
  readonly ShipIcon = Ship;
  readonly StarIcon = Star;

  selectedTicket = signal<Trip | null>(null);
  activeTrips = signal<Trip[]>([]);
  pastTrips = signal<Trip[]>([]);
  reviews = signal<OpinionDTO[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    if (this.user) {
      this.cargarReservas();
    } else {
      this.isLoading.set(false);
    }
  }

  get user() {
    return this.authService.user();
  }

  cargarReservas() {
    forkJoin({
      reservas: this.reservaService.getMisReservas().pipe(
        catchError((err) => {
          console.error('Error cargando reservas', err);
          return of([]);
        }),
      ),
      reviews: this.opinionService.getMisOpiniones().pipe(
        catchError((err) => {
          console.error('Error cargando resenas', err);
          return of([]);
        }),
      ),
    }).subscribe({
      next: ({ reservas, reviews }) => {
        const trips = reservas.map((res) => this.toTrip(res));
        const now = new Date().toISOString().split('T')[0];

        this.activeTrips.set(trips.filter((t) => t.estado !== 'CANCELADA' && t.checkOut >= now));
        this.pastTrips.set(trips.filter((t) => t.estado !== 'CANCELADA' && t.checkOut < now));
        this.reviews.set(reviews);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openTicket(trip: Trip) {
    this.selectedTicket.set(trip);
  }

  openReceipt(trip: Trip) {
    this.router.navigate(['/receipt', trip.bookingId]);
  }

  closeTicket() {
    this.selectedTicket.set(null);
  }

  getTransportIcon(type: string | undefined | null) {
    if (type?.toLowerCase() === 'tren') return this.TrainIcon;
    if (type?.toLowerCase() === 'barco') return this.ShipIcon;
    return this.PlaneTakeoffIcon;
  }

  getArray(length: number) {
    return new Array(length);
  }

  downloadPDF(elementId: string, filename: string) {
    window.print();
  }

  formatTicketDate(value: string | undefined | null): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString(this.getCurrentLocale(), {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private getCurrentLocale(): string {
    return this.translationService.currentLang() === 'en' ? 'en-US' : 'es-ES';
  }

  private toTrip(reserva: ReservaResponse): Trip {
    let transportObj = null;
    if (reserva.transporteTipo) {
      transportObj = {
        type: reserva.transporteTipo,
        name: reserva.transporteNombre || 'Transporte',
        time: reserva.transporteHora || '12:00',
        seat: reserva.transporteAsiento || '-',
        gate: reserva.transportePuerta || '-',
      };
    }

    const checkInDate = new Date(reserva.checkIn);
    const checkOutDate = new Date(reserva.checkOut);
    const dateStr = `${checkInDate.toLocaleDateString(this.getCurrentLocale(), { day: '2-digit', month: 'short' })} - ${checkOutDate.toLocaleDateString(this.getCurrentLocale(), { day: '2-digit', month: 'short', year: 'numeric' })}`;

    return {
      bookingId: String(reserva.id),
      id: String(reserva.destinoId),
      hotelId: String(reserva.alojamientoId),
      destination: reserva.destinoNombre,
      date: dateStr,
      hotel: reserva.alojamientoNombre,
      image: reserva.imagenUrl || 'assets/placeholder.jpg',
      bookingDate: reserva.fechaReserva,
      checkIn: reserva.checkIn,
      checkOut: reserva.checkOut,
      nights: reserva.noches,
      guests: reserva.huespedes,
      totalAmount: reserva.precioTotal,
      estado: reserva.estado,
      transport: transportObj,
    };
  }
}
