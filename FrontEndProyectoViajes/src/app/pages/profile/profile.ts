import { Component } from '@angular/core';
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
import {
  BookingRecord,
  BookingTransport,
  formatBookingDate,
  formatStayRange,
  getStoredBookingsForUser,
  isBookingCanceled,
  isBookingPast,
} from '../../data/destinations';

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
  transport: BookingTransport | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  constructor(
    private authService: Auth,
    private translationService: TranslationService,
    private router: Router,
  ) { }

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

  selectedTicket: Trip | null = null;

  private readonly fallbackActiveTrips: Trip[] = [
    {
      bookingId: 'fallback-paris-1',
      id: 'paris-1',
      hotelId: 'paris-1',
      destination: 'París, Francia',
      date: '15 mayo 2026 - 18 mayo 2026',
      hotel: 'Hotel Le Meurice',
      bookingDate: '10 abril 2026',
      checkIn: '2026-05-15',
      checkOut: '2026-05-18',
      nights: 3,
      guests: 2,
      totalAmount: 0,
      transport: {
        type: 'avion',
        name: 'AirFrance AF1234',
        time: '10:30 AM',
        seat: '14A',
        gate: 'B42',
        platform: null,
        terminal: null,
      },
      image:
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc3NTk5MzE5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  private readonly fallbackPastTrips: Trip[] = [
    {
      bookingId: 'fallback-tokyo-1',
      id: 'tokyo-1',
      hotelId: 'tokyo-1',
      destination: 'Tokio, Japón',
      date: '10 enero 2025 - 24 enero 2025',
      hotel: 'Aman Tokyo',
      bookingDate: '01 enero 2025',
      checkIn: '2025-01-10',
      checkOut: '2025-01-24',
      nights: 14,
      guests: 2,
      totalAmount: 0,
      transport: null,
      image:
        'https://images.unsplash.com/photo-1641558996066-fcf78962c30a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBzdHJlZXR8ZW58MXx8fHwxNzc1OTYyMjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  get user() {
    return this.authService.user();
  }

  get activeTrips(): Trip[] {
    return this.getTripsFromBookings(
      (booking) => !isBookingCanceled(booking) && !isBookingPast(booking),
      this.fallbackActiveTrips,
    );
  }

  get pastTrips(): Trip[] {
    return this.getTripsFromBookings(
      (booking) => !isBookingCanceled(booking) && isBookingPast(booking),
      this.fallbackPastTrips,
    );
  }

  openTicket(trip: Trip) {
    this.selectedTicket = trip;
  }

  openReceipt(trip: Trip) {
    this.router.navigate(['/receipt', trip.bookingId || trip.hotelId || trip.id || 'paris-1']);
  }

  closeTicket() {
    this.selectedTicket = null;
  }

  getTransportIcon(type: string | undefined | null) {
    if (type === 'tren') return this.TrainIcon;
    if (type === 'barco') return this.ShipIcon;
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
    return formatBookingDate(value, this.getCurrentLocale());
  }

  private getCurrentLocale(): string {
    return this.translationService.currentLang() === 'en' ? 'en-US' : 'es-ES';
  }

  private toTrip(booking: BookingRecord): Trip {
    const locale = this.getCurrentLocale();

    return {
      bookingId: booking.id,
      id: booking.hotelId,
      hotelId: booking.hotelId,
      destination: booking.destination,
      date: formatStayRange(booking.checkIn, booking.checkOut, locale),
      hotel: booking.hotelName,
      bookingDate: formatBookingDate(booking.bookingDate, locale),
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: booking.nights,
      guests: booking.guests,
      totalAmount: booking.totalAmount,
      transport: booking.transport,
      image: booking.image,
    };
  }

  private getTripsFromBookings(
    filterFn: (booking: BookingRecord) => boolean,
    fallbackTrips?: Trip[],
  ): Trip[] {
    const trips = getStoredBookingsForUser(this.user?.email)
      .filter(filterFn)
      .map((booking) => this.toTrip(booking));

    if (trips.length === 0 && fallbackTrips) {
      return fallbackTrips;
    }

    return trips;
  }
}

