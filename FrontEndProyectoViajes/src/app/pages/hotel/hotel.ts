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
  city = signal<any>(null);
  country = signal<any>(null);

  checkInDate = '';
  checkOutDate = '';
  guests = 1;
  selectedTransport: 'AVION' | 'TREN' | 'BARCO' = 'AVION';

  newReviewRating = 5;
  newReviewComment = '';
  editReviewId: string | null = null;

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
      },
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
      this.nights > 0 && this.auth.credits() >= this.totalPrice && this.auth.cards().length > 0
    );
  }

  getArray(length: number): any[] {
    return Array.from({ length: length || 0 });
  }

  getRatingLabel(rating: number): string {
    const labels: any = { 5: 'Excelente', 4: 'Muy bueno', 3: 'Bueno', 2: 'Regular', 1: 'Malo' };
    return labels[rating] || '';
  }

  isMyReview(review: any): boolean {
    const user = this.auth.user();
    return user ? user.name === review.userName : false;
  }

  startEditReview(review: any) {
    this.editReviewId = review.id;
    this.newReviewRating = review.rating;
    this.newReviewComment = review.comment;
  }

  cancelEditReview() {
    this.editReviewId = null;
    this.newReviewRating = 5;
    this.newReviewComment = '';
  }

  deleteReview(id: any) {
    console.log('Borrar review', id);
  }

  addReview() {
    console.log('Añadir review', this.newReviewComment);
  }

  setRating(star: number) {
    this.newReviewRating = star;
  }

  getRecCity(cityId: any) {
    return { name: 'Ciudad' };
  }

  reservar() {
    const bookingRequest = {
      usuarioId: this.auth.user()?.id,
      habitacionId: this.habitaciones()[0]?.id,
      fechaInicio: this.checkInDate,
      fechaFin: this.checkOutDate,
      transporte: this.selectedTransport,
      precioTotal: this.totalPrice,
    };
    this.destinoService.crearReserva(bookingRequest).subscribe({
      next: (res) => {
        this.auth.updateCredits(-this.totalPrice);
        this.router.navigate(['/receipt', res.id]);
      },
    });
  }
}
