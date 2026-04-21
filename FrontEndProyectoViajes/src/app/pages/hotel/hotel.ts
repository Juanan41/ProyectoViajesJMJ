import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  getHotelById,
  getCityById,
  getCountryById,
  hotels,
  Hotel,
  City,
  Country,
  Review,
} from '../../data/destinations';
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
  translationService = inject(TranslationService);
  route = inject(ActivatedRoute);
  auth = inject(Auth);

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

  hotel: Hotel | undefined;
  city: City | undefined;
  country: Country | undefined;

  recommendations: Hotel[] = [];

  days = 1;
  guests = 1;

  newReviewRating: number = 5;
  newReviewComment: string = '';

  selectedTransport: 'avion' | 'tren' | 'barco' = 'avion';
  availableTransports: string[] = ['avion', 'barco'];

  editReviewId: string | null = null;

  setRating(star: number) {
    this.newReviewRating = star;
  }

  isMyReview(review: Review): boolean {
    return this.auth.user()?.name === review.userName;
  }

  deleteReview(reviewId: string) {
    if (!this.hotel) return;
    this.hotel.reviews = this.hotel.reviews?.filter((r) => r.id !== reviewId);
    if (this.auth.user()) {
      const filtered = this.auth.user()!.reviews?.filter((r) => r.id !== reviewId) || [];
      this.auth.updateUser({ reviews: filtered });
    }
  }

  startEditReview(review: Review) {
    this.editReviewId = review.id;
    this.newReviewRating = review.rating;
    this.newReviewComment = review.comment;
  }

  cancelEditReview() {
    this.editReviewId = null;
    this.newReviewRating = 5;
    this.newReviewComment = '';
  }

  addReview() {
    if (!this.newReviewComment.trim()) return;

    const currentUser = this.auth.user();
    if (!currentUser || !this.hotel) return;

    if (this.editReviewId) {
      // Editable
      const updatedReview = {
        rating: Number(this.newReviewRating),
        comment: this.newReviewComment,
        date: new Date().toISOString().split('T')[0],
      };

      this.hotel.reviews = this.hotel.reviews?.map((r) =>
        r.id === this.editReviewId ? { ...r, ...updatedReview } : r,
      );
      const userReviews =
        currentUser.reviews?.map((r) =>
          r.id === this.editReviewId ? { ...r, ...updatedReview } : r,
        ) || [];
      this.auth.updateUser({ reviews: userReviews });

      this.editReviewId = null;
    } else {
      const newReview: Review = {
        id: Math.random().toString(36).substr(2, 9),
        userName: currentUser.name,
        rating: Number(this.newReviewRating),
        comment: this.newReviewComment,
        date: new Date().toISOString().split('T')[0],
        hotelName: this.hotel.name,
      };

      if (!this.hotel.reviews) {
        this.hotel.reviews = [];
      }
      this.hotel.reviews = [...this.hotel.reviews, newReview];

      const userReviews = currentUser.reviews || [];
      this.auth.updateUser({ reviews: [...userReviews, newReview] });
    }

    this.newReviewComment = '';
    this.newReviewRating = 5;
  }

  get canBook(): boolean {
    const balance = this.auth.credits();
    const hasCard = this.auth.cards().length > 0;
    return balance >= this.totalPrice && hasCard;
  }

  reservar() {
    if (this.auth.cards().length === 0) {
      alert(
        this.translationService.translate(
          'Necesitas tener una tarjeta asociada a tu cuenta para reservar.',
        ),
      );
      return;
    }

    const balance = this.auth.credits();
    if (balance < this.totalPrice) {
      alert(this.translationService.translate('No tienes saldo suficiente.'));
      return;
    }

    this.auth.updateCredits(-this.totalPrice);
    alert(this.translationService.translate('Reserva exitosa!'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.hotel = getHotelById(id);
        if (this.hotel) {
          this.city = getCityById(this.hotel.cityId);
          if (this.city) {
            this.country = getCountryById(this.city.countryId);
          }
          this.loadRecommendations();
        }
      }
    });
  }

  loadRecommendations() {
    if (!this.hotel) return;

    const h = this.hotel;
    const similarHotels = hotels.filter((item) => {
      if (item.id === h.id) return false;

      const isSameCity = item.cityId === h.cityId;
      const priceDiff = Math.abs(item.pricePerNight - h.pricePerNight);
      const isSimilarPrice = priceDiff <= 200;

      return isSameCity || isSimilarPrice;
    });

    this.recommendations = similarHotels.slice(0, 3);
  }

  getArray(length: number) {
    return Array.from({ length }).map((_, i) => i + 1);
  }

  getRecCity(cityId: string) {
    return getCityById(cityId);
  }

  get totalPrice(): number {
    let basePrice = (this.hotel?.pricePerNight || 0) * this.days * this.guests;
    if (this.selectedTransport === 'avion') basePrice += 150;
    if (this.selectedTransport === 'tren') basePrice += 50;
    if (this.selectedTransport === 'barco') basePrice += 100;
    return basePrice;
  }
}
