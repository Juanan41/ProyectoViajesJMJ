import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  Trash2,
  Pencil,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { TranslationService } from '../../services/translation';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ReservaService, ReservaResponse } from '../../services/reserva.service';
import { OpinionDTO, OpinionService } from '../../services/opinion.service';
import { TicketService } from '../../services/ticket.service';
import {
  getDistanceFromMadridKm,
  toDestinationCoordinateKey,
} from '../../data/destination-coordinates';
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
    identifier: string;
    time: string;
    seat: string;
    gate: string;
    code: string;
  } | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(Auth);
  private translationService = inject(TranslationService);
  private reservaService = inject(ReservaService);
  private opinionService = inject(OpinionService);
  private ticketService = inject(TicketService);
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
  readonly TrashIcon = Trash2;
  readonly PencilIcon = Pencil;

  selectedTicket = signal<Trip | null>(null);
  activeTrips = signal<Trip[]>([]);
  pastTrips = signal<Trip[]>([]);
  reviews = signal<OpinionDTO[]>([]);
  isLoading = signal(true);

  showProfileModal = signal(false);
  isSavingProfile = signal(false);
  profileError = signal('');

  editProfileForm = {
    name: '',
    email: '',
    avatarUrl: '',
  };

  visitedDestinationsCount = computed(() => {
    const visitedDestinations = this.pastTrips()
      .map((trip) => toDestinationCoordinateKey(trip.destination))
      .filter(Boolean);

    return new Set(visitedDestinations).size;
  });

  traveledKm = computed(() => {
    return this.pastTrips().reduce((total, trip) => {
      return total + getDistanceFromMadridKm(trip.destination);
    }, 0);
  });

  editingReviewId: number | null = null;
  editReviewRating = 5;
  editReviewComment = '';

  reviewToDelete = signal<OpinionDTO | null>(null);
  isDeletingReview = signal(false);
  deleteReviewError = signal('');

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
          console.error('Error cargando reseñas', err);
          return of([]);
        }),
      ),
    }).subscribe({
      next: ({ reservas, reviews }) => {
        const trips = reservas.map((res) => this.toTrip(res));
        const today = new Date().toISOString().split('T')[0];

        this.activeTrips.set(
          trips.filter((trip) => trip.estado !== 'CANCELADA' && trip.checkOut >= today),
        );

        this.pastTrips.set(
          trips.filter((trip) => trip.estado !== 'CANCELADA' && trip.checkOut < today),
        );

        this.reviews.set(reviews);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openEditProfile() {
    const currentUser = this.user;

    if (!currentUser) return;

    this.profileError.set('');

    this.editProfileForm = {
      name: currentUser.name || '',
      email: currentUser.email || '',
      avatarUrl: currentUser.avatarUrl || '',
    };

    this.showProfileModal.set(true);
  }

  closeProfileModal() {
    if (this.isSavingProfile()) return;

    this.profileError.set('');
    this.showProfileModal.set(false);
  }

  saveProfile() {
    const name = this.editProfileForm.name.trim();
    const email = this.editProfileForm.email.trim();
    const avatarUrl = this.editProfileForm.avatarUrl.trim();

    if (!name || !email) {
      this.profileError.set('El nombre y el email son obligatorios.');
      return;
    }

    this.isSavingProfile.set(true);
    this.profileError.set('');

    this.authService
      .actualizarPerfil({
        username: name,
        email,
        avatarUrl,
      })
      .subscribe({
        next: () => {
          this.isSavingProfile.set(false);
          this.showProfileModal.set(false);
        },
        error: (err) => {
          console.error('Error actualizando perfil', err);
          this.isSavingProfile.set(false);

          const message =
            typeof err?.error === 'string'
              ? err.error
              : err?.error?.message || 'No se pudo actualizar el perfil.';

          this.profileError.set(message);
        },
      });
  }

  getUserInitials(): string {
    const currentUser = this.user;
    const value = currentUser?.name || currentUser?.email || 'U';

    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  openTicket(trip: Trip) {
    this.selectedTicket.set(trip);
  }

  openReceipt(trip: Trip) {
    this.router.navigate(['/receipt', trip.bookingId], {
      queryParams: { from: 'profile' },
    });
  }

  closeTicket() {
    this.selectedTicket.set(null);
  }

  getTransportIcon(type: string | undefined | null) {
    const normalized = (type || '').toLowerCase();

    if (normalized.includes('tren')) return this.TrainIcon;
    if (normalized.includes('barco')) return this.ShipIcon;

    return this.PlaneTakeoffIcon;
  }

  getArray(length: number | undefined | null) {
    return new Array(length || 0);
  }

  getTicketCode(bookingId: string | undefined | null): string {
    return `TKM-${String(bookingId || '0').padStart(8, '0')}`;
  }

  startEditReview(review: OpinionDTO) {
    this.editingReviewId = review.id;
    this.editReviewRating = review.puntuacion || 5;
    this.editReviewComment = review.comentario || '';
  }

  setEditReviewRating(star: number) {
    this.editReviewRating = star;
  }

  cancelEditReview() {
    this.editingReviewId = null;
    this.editReviewRating = 5;
    this.editReviewComment = '';
  }

  saveReview(review: OpinionDTO) {
    if (!this.editReviewComment.trim()) return;

    this.opinionService
      .updateOpinion(review.id, {
        puntuacion: this.editReviewRating,
        comentario: this.editReviewComment,
      })
      .subscribe({
        next: (updatedReview) => {
          this.reviews.set(
            this.reviews().map((r) => (r.id === updatedReview.id ? updatedReview : r)),
          );
          this.cancelEditReview();
        },
        error: (err) => console.error('Error actualizando reseña', err),
      });
  }

  askDeleteReview(review: OpinionDTO) {
    this.deleteReviewError.set('');
    this.reviewToDelete.set(review);
  }

  closeDeleteReviewModal() {
    if (this.isDeletingReview()) return;

    this.deleteReviewError.set('');
    this.reviewToDelete.set(null);
  }

  confirmDeleteReview() {
    const review = this.reviewToDelete();

    if (!review || this.isDeletingReview()) return;

    this.isDeletingReview.set(true);
    this.deleteReviewError.set('');

    this.opinionService.deleteOpinion(review.id).subscribe({
      next: () => {
        this.reviews.set(this.reviews().filter((r) => r.id !== review.id));
        this.isDeletingReview.set(false);
        this.reviewToDelete.set(null);
      },
      error: (err) => {
        console.error('Error borrando reseña', err);
        this.isDeletingReview.set(false);
        this.deleteReviewError.set('No se pudo borrar la reseña. Inténtalo de nuevo.');
      },
    });
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
      const ticket = this.ticketService.getTicketData(reserva);

      transportObj = {
        type: ticket.tipoTransporte,
        name: ticket.nombreTransporte,
        identifier: ticket.identificadorTransporte,
        time: ticket.hora,
        seat: ticket.asiento,
        gate: ticket.puerta,
        code: ticket.codigoTicket,
      };
    }

    const checkInDate = new Date(reserva.checkIn);
    const checkOutDate = new Date(reserva.checkOut);

    const dateStr = `${checkInDate.toLocaleDateString(this.getCurrentLocale(), {
      day: '2-digit',
      month: 'short',
    })} - ${checkOutDate.toLocaleDateString(this.getCurrentLocale(), {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}`;

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
