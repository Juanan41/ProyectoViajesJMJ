import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Calendar,
  MapPin,
  Plane,
  ArrowRight,
  History,
  Trash2,
} from 'lucide-angular';
import { Auth } from '../../services/auth';
import { DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './trips.html',
})
export class Trips implements OnInit {
  private auth = inject(Auth);
  private destinoService = inject(DestinoService);

  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly PlaneIcon = Plane;
  readonly ArrowRightIcon = ArrowRight;
  readonly HistoryIcon = History;
  readonly TrashIcon = Trash2;

  trips = signal<any[]>([]);

  ngOnInit() {
    this.loadUserTrips();
  }

  loadUserTrips() {
    const user = this.auth.user();
    if (user) {
      this.destinoService.getReservasUsuario(user.id).subscribe({
        next: (data) => this.trips.set(data),
        error: (err) => console.error('Error cargando viajes:', err),
      });
    }
  }

  getStatusClass(estado: string): string {
    const s = estado?.toUpperCase();
    if (s === 'CONFIRMADA') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (s === 'PENDIENTE') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }

  cancelTrip(id: string) {
    if (confirm('¿Estás seguro de que deseas cancelar este viaje?')) {
      console.log('Cancelando reserva:', id);
    }
  }
}
