import { Component, inject } from '@angular/core';
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
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface Trip {
  id: string;
  hotelId: string;
  destination: string;
  date: string;
  hotel: string;
  image: string;
  transport: {
    type: string;
    name: string;
    time: string;
    seat: string | null;
    gate: string | null;
    platform: string | null;
    terminal: string | null;
  } | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  authService = inject(Auth);
  router = inject(Router);

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

  get user() {
    return this.authService.user();
  }

  // Mock data matching React
  activeTrips: Trip[] = [
    {
      id: 'paris-1',
      hotelId: 'paris-1',
      destination: 'París, Francia',
      date: '15-18 Mayo 2026',
      hotel: 'Hotel Le Meurice',
      transport: {
        type: 'plane',
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

  pastTrips: Trip[] = [
    {
      id: 'tokyo-1',
      hotelId: 'tokyo-1',
      destination: 'Tokio, Jap�n',
      date: '10-24 Enero 2025',
      hotel: 'Aman Tokyo',
      transport: null,
      image:
        'https://images.unsplash.com/photo-1641558996066-fcf78962c30a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBzdHJlZXR8ZW58MXx8fHwxNzc1OTYyMjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  openTicket(trip: Trip) {
    this.selectedTicket = trip;
  }

  openReceipt(trip: Trip) {
    const hotelId = trip.hotelId || trip.id || 'paris-1';
    this.router.navigate(['/receipt', hotelId]);
  }

  closeTicket() {
    this.selectedTicket = null;
  }

  getTransportIcon(type: string | undefined | null) {
    if (type === 'train') return this.TrainIcon;
    if (type === 'ship') return this.ShipIcon;
    return this.PlaneTakeoffIcon;
  }

  getArray(length: number) {
    return new Array(length);
  }

  downloadPDF(elementId: string, filename: string) {
    window.print();
  }
}
