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

type TransportType = 'AVION' | 'TREN' | 'BARCO';
type RoomCategory = 'single' | 'double' | 'suite' | 'group';

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

  hotel = signal<any | null>(null);
  habitaciones = signal<any[]>([]);
  selectedRoomId = signal<number | null>(null);
  recommendations = signal<any[]>([]);
  reviews = signal<any[]>([]);

  checkInDate = '';
  checkOutDate = '';
  guests = 1;
  selectedTransport: TransportType = 'AVION';

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

  travelOverlapModal = signal<{
    requestedStart: string;
    requestedEnd: string;
    conflicts: any[];
  } | null>(null);

  pendingBookingRequest = signal<any | null>(null);
  isCreatingBooking = signal(false);

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
    const availableRooms = this.habitaciones()
      .filter((room) => this.isRoomAvailable(room))
      .sort((a, b) => this.getRoomSortValue(a) - this.getRoomSortValue(b));

    const firstAvailableRoom = availableRooms[0];
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
        'Esta habitación no es compatible con el número de huéspedes seleccionado.',
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
    const capacity = this.getRoomCapacity(room);
    const category = this.getRoomCategory(room);

    if (this.guests <= 1) {
      return capacity >= 1;
    }

    if (this.guests === 2) {
      return capacity >= 2 && ['double', 'suite', 'group'].includes(category);
    }

    if (this.guests >= 3 && this.guests <= 4) {
      return capacity >= this.guests && ['suite', 'group'].includes(category);
    }

    return capacity >= this.guests && category === 'group';
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
        const mapped = (data || []).map((o) => ({
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

    if (!room || this.nights <= 0) return 0;

    const roomPrice = this.getRoomPrice(room);
    return roomPrice * this.nights * this.guests + this.getTransportPrice(this.selectedTransport);
  }

  get canBook(): boolean {
    return (
      this.auth.isLoggedIn() &&
      this.nights > 0 &&
      this.selectedRoom() !== null &&
      this.hasPaymentCard() &&
      !this.isCheckingCard() &&
      !this.isCreatingBooking() &&
      Number(this.auth.credits() || 0) >= this.totalPrice
    );
  }

  isBooking(): boolean {
    return this.isCreatingBooking();
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
    return Number(hotel?.rating ?? hotel?.estrellas ?? 0);
  }

  hasHotelReviews(hotel: any): boolean {
    return (
      Number(hotel?.totalOpiniones ?? hotel?.reviewCount ?? this.reviews().length ?? 0) > 0 &&
      this.getHotelRating(hotel) > 0
    );
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

  getTransportPrice(type: TransportType): number {
    const costs: Record<TransportType, number> = {
      AVION: 150,
      TREN: 50,
      BARCO: 100,
    };

    return costs[type];
  }

  getTransportLabel(type: TransportType): string {
    const labels: Record<TransportType, string> = {
      AVION: 'Avión',
      TREN: 'Tren',
      BARCO: 'Barco',
    };

    return labels[type];
  }

  getRoomPrice(room: any): number {
    const roomPrice = Number(room?.precioPorNoche || room?.precio_por_noche || room?.precio || 0);

    if (Number.isFinite(roomPrice) && roomPrice > 0) return roomPrice;

    return this.getHotelPrice(this.hotel());
  }

  getRoomName(room: any): string {
    return room?.tipo || room?.nombre || 'Habitación estándar';
  }

  getRoomRegimen(room: any): string {
    return room?.regimen || 'Solo alojamiento';
  }

  getRoomCapacity(room: any): number {
    const capacity = Number(room?.capacidad || room?.capacity || 0);

    if (!Number.isFinite(capacity) || capacity <= 0) return 1;

    return capacity;
  }

  getRoomCapacityLabel(room: any): string {
    return String(this.getRoomCapacity(room));
  }

  getRoomCategory(room: any): RoomCategory {
    const name = this.normalizeText(this.getRoomName(room));
    const capacity = this.getRoomCapacity(room);

    if (
      name.includes('grupal') ||
      name.includes('grupo') ||
      name.includes('familiar') ||
      name.includes('family')
    ) {
      return 'group';
    }

    if (name.includes('suite')) {
      return 'suite';
    }

    if (name.includes('individual') || name.includes('single')) {
      return 'single';
    }

    if (
      name.includes('doble') ||
      name.includes('deluxe') ||
      name.includes('estandar') ||
      name.includes('standard')
    ) {
      return 'double';
    }

    if (capacity >= 8) return 'group';
    if (capacity >= 4) return 'suite';
    if (capacity >= 2) return 'double';

    return 'single';
  }

  getRoomTypeHelp(room: any): string {
    const category = this.getRoomCategory(room);

    if (category === 'group') {
      return 'Habitación grupal recomendada para grupos de 5 a 8 personas.';
    }

    if (category === 'suite') {
      return 'Suite recomendada para grupos de 3 o 4 personas.';
    }

    if (category === 'double') {
      return 'Habitación recomendada para 1 o 2 personas.';
    }

    return 'Habitación individual recomendada para 1 persona.';
  }

  getGuestsRuleMessage(): string {
    if (this.guests <= 1) {
      return 'Puedes elegir cualquier habitación con capacidad suficiente.';
    }

    if (this.guests === 2) {
      return 'Para 2 huéspedes puedes elegir habitación doble, estándar/deluxe, suite o habitación grupal.';
    }

    if (this.guests >= 3 && this.guests <= 4) {
      return 'Para 3 o 4 huéspedes puedes elegir suite o habitación grupal.';
    }

    return 'Para 5 a 8 huéspedes solo puedes elegir habitación grupal.';
  }

  getRoomCardClasses(room: any): string {
    if (this.isRoomSelected(room)) {
      return 'bg-emerald-500/10 border-emerald-500';
    }

    if (this.isRoomAvailable(room)) {
      return 'bg-[rgb(23,25,25)] border-gray-800 hover:border-emerald-500/60';
    }

    return 'bg-[rgb(23,25,25)] border-gray-800 opacity-50';
  }

  private getRoomSortValue(room: any): number {
    const category = this.getRoomCategory(room);
    const capacity = this.getRoomCapacity(room);

    const categoryOrder: Record<RoomCategory, number> = {
      single: 1,
      double: 2,
      suite: 3,
      group: 4,
    };

    return categoryOrder[category] * 100 + capacity;
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
    const safeLength = Math.max(0, Math.min(5, Math.round(Number(length || 0))));
    return Array.from({ length: safeLength });
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
        'La habitación seleccionada no es compatible con los huéspedes indicados.',
        'warning',
      );
      return;
    }

    if (this.isCheckingCard()) {
      this.openBookingModal(
        'Comprobando tarjeta',
        'Estamos comprobando tus métodos de pago. Inténtalo de nuevo en unos segundos.',
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

    if (Number(this.auth.credits() || 0) < this.totalPrice) {
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

    this.checkTravelOverlapBeforeBooking(bookingRequest);
  }

  private checkTravelOverlapBeforeBooking(bookingRequest: any) {
    this.destinoService.getMisReservas().subscribe({
      next: (reservas) => {
        const conflicts = this.getOverlappingReservations(reservas || []);

        if (conflicts.length > 0) {
          this.pendingBookingRequest.set(bookingRequest);

          this.travelOverlapModal.set({
            requestedStart: this.checkInDate,
            requestedEnd: this.checkOutDate,
            conflicts,
          });

          return;
        }

        this.createReservation(bookingRequest);
      },
      error: () => {
        this.createReservation(bookingRequest);
      },
    });
  }

  private getOverlappingReservations(reservas: any[]): any[] {
    const requestedStart = this.getDateOnlyForOverlap(this.checkInDate);
    const requestedEnd = this.getDateOnlyForOverlap(this.checkOutDate);

    if (!requestedStart || !requestedEnd) return [];

    return reservas.filter((reserva) => {
      const estado = String(reserva?.estado || '').toUpperCase();

      if (estado === 'CANCELADA') return false;

      const reservationStart = this.getDateOnlyForOverlap(reserva.checkIn || reserva.fechaInicio);
      const reservationEnd = this.getDateOnlyForOverlap(reserva.checkOut || reserva.fechaFin);

      if (!reservationStart || !reservationEnd) return false;

      return requestedStart < reservationEnd && reservationStart < requestedEnd;
    });
  }

  private getDateOnlyForOverlap(value: string | Date | undefined | null): Date | null {
    if (!value) return null;

    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) return null;

      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    const text = String(value);
    const datePart = text.includes('T') ? text.split('T')[0] : text;
    const parts = datePart.split('-').map(Number);

    if (parts.length >= 3 && parts.every((part) => Number.isFinite(part))) {
      const [year, month, day] = parts;
      return new Date(year, month - 1, day);
    }

    const fallback = new Date(text);

    if (Number.isNaN(fallback.getTime())) return null;

    fallback.setHours(0, 0, 0, 0);
    return fallback;
  }

  closeTravelOverlapModal() {
    if (this.isCreatingBooking()) return;

    this.travelOverlapModal.set(null);
    this.pendingBookingRequest.set(null);
  }

  confirmTravelOverlapBooking() {
    const bookingRequest = this.pendingBookingRequest();

    if (!bookingRequest || this.isCreatingBooking()) return;

    this.travelOverlapModal.set(null);
    this.createReservation(bookingRequest);
  }

  private createReservation(bookingRequest: any) {
    this.isCreatingBooking.set(true);
    this.destinoService.crearReserva(bookingRequest).subscribe({
      next: (res) => {
        this.isCreatingBooking.set(false);
        this.pendingBookingRequest.set(null);

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
        this.isCreatingBooking.set(false);

        this.openBookingModal(
          'No se pudo completar la reserva',
          'Hubo un error al reservar. Revisa tu saldo, las fechas o la disponibilidad del hotel.',
          'error',
        );
      },
    });
  }

  formatDate(value: string | Date | undefined | null): string {
    if (!value) return '-';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('es-ES');
  }

  private normalizeText(value: any): string {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
