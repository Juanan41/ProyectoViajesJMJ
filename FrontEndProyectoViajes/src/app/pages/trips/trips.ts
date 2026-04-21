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
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './trips.html',
})
export class Trips {
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

  selectedTicket: Trip | null = null;

  get user() {
    return this.authService.user();
  }

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
      destination: 'Tokio, Japón',
      date: '10-24 Enero 2025',
      hotel: 'Aman Tokyo',
      transport: {
        type: 'plane',
        name: 'JAL 405',
        time: '14:20 PM',
        seat: '4C',
        gate: 'G12',
        platform: null,
        terminal: '1',
      },
      image:
        'https://images.unsplash.com/photo-1641558996066-fcf78962c30a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBzdHJlZXR8ZW58MXx8fHwxNzc1OTYyMjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'london-1',
      hotelId: 'london-1',
      destination: 'Londres, Reino Unido',
      date: '05-12 Marzo 2024',
      hotel: 'The Savoy',
      transport: {
        type: 'train',
        name: 'Eurostar 9014',
        time: '08:15 AM',
        seat: '12A',
        gate: '12',
        platform: null,
        terminal: null,
      },
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    },
    {
      id: 'barcelona-1',
      hotelId: 'barcelona-1',
      destination: 'Barcelona, España',
      date: '12-16 Agosto 2023',
      hotel: 'W Barcelona',
      transport: {
        type: 'ship',
        name: 'Costa Smeralda',
        time: '23:00 PM',
        seat: '15A',
        gate: 'Pier 2',
        platform: null,
        terminal: 'T1',
      },
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77ef236',
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

  downloadPDF(elementId: string, filename: string) {
    window.print();
  }
}
