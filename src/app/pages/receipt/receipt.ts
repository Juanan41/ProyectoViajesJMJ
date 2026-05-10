import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import {
  LucideAngularModule,
  CheckCircle,
  Printer,
  Download,
  ArrowLeft,
  PlaneTakeoff,
  MapPin,
  Calendar,
  User,
  CreditCard,
} from 'lucide-angular';
import { ReservaService, ReservaResponse } from '../../services/reserva.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './receipt.html',
})
export class Receipt implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservaService = inject(ReservaService);

  readonly CheckCircleIcon = CheckCircle;
  readonly PrinterIcon = Printer;
  readonly DownloadIcon = Download;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly PlaneIcon = PlaneTakeoff;
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly UserIcon = User;
  readonly CreditCardIcon = CreditCard;

  booking = signal<any>(null);
  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadReceipt(Number(id));
      }
    });
  }

  loadReceipt(id: number) {
    this.reservaService.getReservaPorId(id).subscribe({
      next: (data: ReservaResponse) => {
        this.booking.set({
          ...data,
          pais: data.destinoNombre?.split(',')[1]?.trim() || 'Destino',
          fechaInicio: data.checkIn,
          transporte: data.transporteTipo || 'AVION',
        });
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Error al cargar recibo:', err);
        this.isLoading.set(false);
      },
    });
  }

  print() {
    window.print();
  }

  download() {
    window.print();
  }
}
