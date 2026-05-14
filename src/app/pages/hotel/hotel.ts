import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  ArrowLeft,
  Star,
  Plane,
  Train,
  Ship,
  MapPin,
  Wifi,
  Coffee,
  Wind,
  BedDouble,
  CalendarCheck,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { DestinoService } from '../../services/destino.service';
import { OpinionService, CreateOpinionDTO } from '../../services/opinion.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, FormsModule, TranslatePipe],
  templateUrl: './hotel.html',
  styleUrl: './hotel.css',
})
export class HotelComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destinoService = inject(DestinoService);
  private opinionService = inject(OpinionService);
  public auth = inject(Auth);
  public translationService = inject(TranslationService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly StarIcon = Star;
  readonly PlaneIcon = Plane;
  readonly TrainIcon = Train;
  readonly ShipIcon = Ship;
  readonly MapPinIcon = MapPin;
  readonly WifiIcon = Wifi;
  readonly CoffeeIcon = Coffee;
  readonly WindIcon = Wind;
  readonly BedDoubleIcon = BedDouble;
  readonly CalendarCheckIcon = CalendarCheck;

  hotel = signal<any>(null);
  habitaciones = signal<any[]>([]);
  recommendations = signal<any[]>([]);
  reviews = signal<any[]>([]);

  checkInDate = '';
  checkOutDate = '';
  guests = 1;
  selectedTransport: 'AVION' | 'TREN' | 'BARCO' = 'AVION';
  hasPaymentCard = signal(false);
  isCheckingCard = signal(true);

  newReviewRating = 5;
  newReviewComment = '';
  editingReviewId: number | null = null;

  reviewToDelete = signal<any | null>(null);
  isDeletingReview = signal(false);
  deleteReviewError = signal('');

  bookingModal = signal<{
    title: string;
    message: string;
    type: 'warning' | 'error';
  } | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadHotelFullData(Number(id));
      }
    });
  }

  private loadHotelFullData(id: number) {
    this.destinoService.getHotelDetails(id).subscribe({
      next: (data) => {
        this.hotel.set(data);
        this.loadRooms(id);
        this.loadRecommendations();
        this.initializeStayDates();
        this.loadOpiniones(id);
        this.loadPaymentCardStatus();
      },
    });
  }

  private loadPaymentCardStatus() {
    if (!this.auth.isLoggedIn()) {
      this.hasPaymentCard.set(false);
      this.isCheckingCard.set(false);
      return;
    }

    this.isCheckingCard.set(true);

    this.auth.obtenerTarjetas().subscribe({
      next: (cards) => {
        this.hasPaymentCard.set((cards || []).length > 0);
        this.isCheckingCard.set(false);
      },
      error: () => {
        this.hasPaymentCard.set(false);
        this.isCheckingCard.set(false);
      },
    });
  }

  private loadOpiniones(id: number) {
    this.opinionService.getOpinionesByAlojamiento(id).subscribe({
      next: (data) => {
        const mapped = data.map((o) => ({
          ...o,
          userName: o.nombreUsuario,
          rating: o.puntuacion,
          comment: o.comentario,
          date: o.fechaOpinion
            ? o.fechaOpinion.substring(0, 10)
            : new Date().toISOString().split('T')[0],
        }));

        this.reviews.set(mapped);
      },
      error: (e) => console.error('Error cargando opiniones', e),
    });
  }

  private loadRooms(hotelId: number) {
    this.destinoService
      .getHabitacionesByHotel(hotelId)
      .subscribe((data) => this.habitaciones.set(data));
  }

  private loadRecommendations() {
    this.destinoService.getDestinos().subscribe((data) => {
      this.recommendations.set(data.slice(0, 3));
    });
  }

  initializeStayDates() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.checkInDate = today.toISOString().split('T')[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.checkOutDate = tomorrow.toISOString().split('T')[0];
  }

  get nights(): number {
    if (!this.checkInDate || !this.checkOutDate) return 0;

    const diff = new Date(this.checkOutDate).getTime() - new Date(this.checkInDate).getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get totalPrice(): number {
    const costs: any = { AVION: 150, TREN: 50, BARCO: 100 };
    const hotelPrice = this.hotel()?.precioPorNoche ?? 0;

    return hotelPrice * this.nights * this.guests + (costs[this.selectedTransport] || 0);
  }

  get canBook(): boolean {
    return (
      this.nights > 0 &&
      this.hasPaymentCard() &&
      !this.isCheckingCard() &&
      this.auth.credits() >= this.totalPrice
    );
  }

  getArray(length: number | undefined | null): any[] {
    return Array.from({ length: length || 0 });
  }

  getRatingLabel(rating: number): string {
    const labels: Record<number, string> = {
      5: 'Excelente',
      4: 'Muy bueno',
      3: 'Bueno',
      2: 'Regular',
      1: 'Malo',
    };

    return labels[rating] || '';
  }

  setRating(star: number) {
    this.newReviewRating = star;
  }

  isMyReview(review: any): boolean {
    const user = this.auth.user();
    return user ? user.name === review.userName : false;
  }

  startEditReview(review: any) {
    this.editingReviewId = review.id;
    this.newReviewRating = review.rating || 5;
    this.newReviewComment = review.comment || '';
  }

  cancelEditReview() {
    this.editingReviewId = null;
    this.newReviewRating = 5;
    this.newReviewComment = '';
  }

  askDeleteReview(review: any) {
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
    const hotelId = this.hotel()?.id;

    if (!review || !hotelId || this.isDeletingReview()) return;

    this.isDeletingReview.set(true);
    this.deleteReviewError.set('');

    this.opinionService.deleteOpinion(review.id).subscribe({
      next: () => {
        this.isDeletingReview.set(false);
        this.reviewToDelete.set(null);
        this.loadOpiniones(hotelId);
      },
      error: (err) => {
        console.error('Error deleting review', err);
        this.isDeletingReview.set(false);
        this.deleteReviewError.set('No se pudo borrar la reseña. Inténtalo de nuevo.');
      },
    });
  }

  addReview() {
    if (!this.newReviewComment.trim()) return;

    const currentUser = this.auth.user();
    if (!currentUser) return;

    const dto: CreateOpinionDTO = {
      puntuacion: this.newReviewRating,
      comentario: this.newReviewComment,
    };

    const hotelId = this.hotel().id;
    if (!hotelId) return;

    const request$ = this.editingReviewId
      ? this.opinionService.updateOpinion(this.editingReviewId, dto)
      : this.opinionService.addOpinion(hotelId, dto);

    request$.subscribe({
      next: () => {
        this.loadOpiniones(hotelId);
        this.cancelEditReview();
      },
      error: (err) => console.error('Error creating review', err),
    });
  }

  openBookingModal(title: string, message: string, type: 'warning' | 'error' = 'warning') {
    this.bookingModal.set({ title, message, type });
  }

  closeBookingModal() {
    this.bookingModal.set(null);
  }

  reservar() {
    if (!this.hasPaymentCard()) {
      this.openBookingModal(
        'Tarjeta necesaria',
        'Necesitas tener una tarjeta asociada a tu cuenta para reservar.',
        'warning',
      );
      return;
    }

    if (this.habitaciones().length === 0) {
      this.openBookingModal(
        'Sin habitaciones disponibles',
        'No hay habitaciones disponibles en este hotel.',
        'warning',
      );
      return;
    }

    if (this.auth.credits() < this.totalPrice) {
      this.openBookingModal(
        'Saldo insuficiente',
        'No tienes saldo suficiente en tu cartera para completar esta reserva.',
        'warning',
      );
      return;
    }

    const bookingRequest = {
      habitacionId: this.habitaciones()[0].id,
      transporte: this.selectedTransport,
      fechaInicio: this.checkInDate,
      fechaFin: this.checkOutDate,
      huespedes: this.guests,
    };

    this.destinoService.crearReserva(bookingRequest).subscribe({
      next: (res) => {
        this.auth.obtenerSaldo().subscribe({
          next: (saldoRes) => {
            this.auth.credits.set(saldoRes.saldo);
            this.auth.updateUser({ saldo: saldoRes.saldo });
            this.router.navigate(['/receipt', res.id]);
          },
          error: () => this.router.navigate(['/receipt', res.id]),
        });
      },
      error: (err) => {
        console.error('Error al realizar la reserva:', err);
        this.openBookingModal(
          'No se pudo completar la reserva',
          'Hubo un error al reservar. Revisa tu saldo o disponibilidad.',
          'error',
        );
      },
    });
  }
}
