import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  CheckCircle,
  Calendar,
  MapPin,
  CreditCard,
  Plane,
  Download,
  Printer,
  ArrowLeft,
} from 'lucide-angular';
import { DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './receipt.html',
})
export class Receipt implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly CheckCircleIcon = CheckCircle;
  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly CreditCardIcon = CreditCard;
  readonly PlaneIcon = Plane;
  readonly DownloadIcon = Download;
  readonly PrinterIcon = Printer;
  readonly ArrowLeftIcon = ArrowLeft;

  booking = signal<any>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.destinoService.getReservaById(id).subscribe({
          next: (data) => this.booking.set(data),
          error: (err) => console.error('Error al cargar recibo:', err),
        });
      }
    });
  }

  print() {
    window.print();
  }

  download() {
    alert('Descargando recibo en PDF...');
  }
}
