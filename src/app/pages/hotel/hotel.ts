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
  CalendarCheck,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { DestinoService } from '../../services/destino.service';
import { OpinionService, CreateOpinionDTO } from '../../services/opinion.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation';
import { getHotelPriceValue, getVisibleHotelAmenities } from '../../utils/hotel-amenities';

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
  readonly CalendarCheckIcon = CalendarCheck;

  readonly maxGuests = 8;

  hotel = signal<any>(null);
  habitaciones = signal<any[]>([]);
  selectedRoomId = signal<number | null>(null);
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
      error: (err) => {
        console.error('Error cargando hotel', err);
        this.hotel.set(null);
      },
    });
  }

  private loadRooms(hotelId: number) {
    this.destinoService.getHabitacionesByHotel(hotelId).subscribe({
      next: (data) => {
        this.habitaciones.set(data || []);
        this.selectFirstAvailableRoom();
      },
      error: (err) => {
        console.error('Error cargando habitaciones', err);
        this.habitaciones.set([]);
        this.selectedRoomId.set(null);
      },
    });
  }

  private selectFirstAvailableRoom() {
    const firstAvailableRoom = this.habitaciones().find((room) => this.isRoomAvailable(room));
    this.selectedRoomId.set(firstAvailableRoom ? Number(firstAvailableRoom.id) : null);
  }

  selectedRoom(): any | null {
    const id = this.selectedRoomId();

    if (id === null) return null;

    return this.habitaciones().find((room) => Number(room.id) === id) || null;
  }

  selectRoom(room: any) {
    if (!this.isRoomAvailable(room)) {
      this.openBookingModal(
        'Habitación no disponible',
        'Esta habitación no tiene capacidad suficiente para el número de huéspedes seleccionado.',
        'warning',
      );
      return;
    }

    this.selectedRoomId.set(Number(room.id));
  }

  isRoomSelected(room: any): boolean {
    return this.selectedRoomId() === Number(room?.id);
  }

  isRoomAvailable(room: any): boolean {
    return this.getRoomCapacity(room) >= this.guests;
  }

  get compatibleRoomsCount(): number {
    return this.habitaciones().filter((room) => this.isRoomAvailable(room)).length;
  }

  onGuestsChange(value: any) {
    const parsedGuests = Number(value);

    if (!Number.isFinite(parsedGuests) || parsedGuests < 1) {
      this.guests = 1;
    } else if (parsedGuests > this.maxGuests) {
      this.guests = this.maxGuests;
    } else {
      this.guests = Math.floor(parsedGuests);
    }

    const currentRoom = this.selectedRoom();

    if (!currentRoom || !this.isRoomAvailable(currentRoom)) {
      this.selectFirstAvailableRoom();
    }
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

  private loadRecommendations() {
    this.destinoService.getDestinos().subscribe({
      next: (data) => {
        this.recommendations.set((data || []).slice(0, 3));
      },
      error: () => {
        this.recommendations.set([]);
      },
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
    const room = this.selectedRoom();
    const roomPrice = room ? this.getRoomPrice(room) : this.getHotelPrice(this.hotel());

    return roomPrice * this.nights * this.guests + this.getTransportPrice(this.selectedTransport);
  }

  get canBook(): boolean {
    return (
      this.auth.isLoggedIn() &&
      this.nights > 0 &&
      this.selectedRoom() !== null &&
      this.hasPaymentCard() &&
      !this.isCheckingCard() &&
      this.auth.credits() >= this.totalPrice
    );
  }

  getHotelPrice(hotel: any): number {
    return getHotelPriceValue(hotel);
  }

  getHotelImage(hotel: any): string {
    return (
      hotel?.imagenUrl ||
      hotel?.imagen ||
      hotel?.image ||
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop'
    );
  }

  getHotelRating(hotel: any): number {
    return Number(hotel?.estrellas || hotel?.rating || 5);
  }

  getHotelDescription(hotel: any): string {
    return (
      hotel?.descripcion ||
      hotel?.description ||
      `Hotel cómodo y bien ubicado en ${hotel?.ciudad || 'este destino'}, ideal para descansar después de descubrir la ciudad.`
    );
  }

  getHotelLocation(hotel: any): string {
    const city = hotel?.ciudad || '';
    const country = hotel?.pais || '';

    if (city && country) return `${city}, ${country}`;
    if (city) return city;
    if (country) return country;

    return 'Ubicación no disponible';
  }

  getVisibleAmenities() {
    return getVisibleHotelAmenities(this.hotel());
  }

  getTransportPrice(type: 'AVION' | 'TREN' | 'BARCO'): number {
    const costs = {
      AVION: 150,
      TREN: 50,
      BARCO: 100,
    };

    return costs[type];
  }

  getTransportLabel(type: 'AVION' | 'TREN' | 'BARCO'): string {
    const labels = {
      AVION: 'Avión',
      TREN: 'Tren',
      BARCO: 'Barco',
    };

    return labels[type];
  }

  getRoomPrice(room: any): number {
    const roomPrice = Number(room?.precioPorNoche || room?.precio_por_noche || room?.precio || 0);

    if (roomPrice > 0) return roomPrice;

    return this.getHotelPrice(this.hotel());
  }

  getRoomName(room: any): string {
    return room?.tipo || room?.nombre || 'Habitación estándar';
  }

  getRoomRegimen(room: any): string {
    return room?.regimen || 'Solo alojamiento';
  }

  getRoomCapacity(room: any): number {
    return Number(room?.capacidad || room?.capacity || 2);
  }

  getRoomCapacityLabel(room: any): string {
    return String(this.getRoomCapacity(room));
  }

  getDestinationImage(destination: any): string {
    return (
      destination?.imagenUrl ||
      destination?.imagen ||
      destination?.image ||
      'assets/placeholder.jpg'
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

    if (!user) return false;

    return String(user.id) === String(review.usuarioId) || user.name === review.userName;
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
    if (!this.auth.isLoggedIn()) {
      this.openBookingModal(
        'Inicia sesión',
        'Necesitas iniciar sesión para escribir una reseña.',
        'warning',
      );
      return;
    }

    if (!this.newReviewComment.trim()) return;

    const dto: CreateOpinionDTO = {
      puntuacion: this.newReviewRating,
      comentario: this.newReviewComment,
    };

    const hotelId = this.hotel()?.id;

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
    if (!this.auth.isLoggedIn()) {
      this.openBookingModal(
        'Inicia sesión',
        'Necesitas iniciar sesión para poder realizar una reserva.',
        'warning',
      );
      return;
    }

    if (this.nights <= 0) {
      this.openBookingModal(
        'Fechas incorrectas',
        'La fecha de salida debe ser posterior a la fecha de entrada.',
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

    const selectedRoom = this.selectedRoom();

    if (!selectedRoom) {
      this.openBookingModal(
        'Selecciona una habitación',
        'Debes seleccionar una habitación compatible antes de reservar.',
        'warning',
      );
      return;
    }

    if (!this.isRoomAvailable(selectedRoom)) {
      this.openBookingModal(
        'Habitación no disponible',
        'La habitación seleccionada no tiene capacidad suficiente para los huéspedes indicados.',
        'warning',
      );
      return;
    }

    if (!this.hasPaymentCard()) {
      this.openBookingModal(
        'Tarjeta necesaria',
        'Necesitas tener una tarjeta asociada a tu cuenta para reservar.',
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
      habitacionId: selectedRoom.id,
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
          'Hubo un error al reservar. Revisa tu saldo, las fechas o la disponibilidad del hotel.',
          'error',
        );
      },
    });
  }
}
