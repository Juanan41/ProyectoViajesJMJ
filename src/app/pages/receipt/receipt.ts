import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  ArrowLeft,
  Download,
  Loader2,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  BedDouble,
  CreditCard,
  PlaneTakeoff,
  Train,
  Ship,
} from 'lucide-angular';
import { ReservaResponse, ReservaService } from '../../services/reserva.service';
import { TicketData, TicketService } from '../../services/ticket.service';
import { Auth } from '../../services/auth';
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
  private ticketService = inject(TicketService);
  private auth = inject(Auth);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly DownloadIcon = Download;
  readonly LoaderIcon = Loader2;
  readonly CheckCircleIcon = CheckCircle2;
  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly UsersIcon = Users;
  readonly BedDoubleIcon = BedDouble;
  readonly CreditCardIcon = CreditCard;
  readonly PlaneTakeoffIcon = PlaneTakeoff;
  readonly TrainIcon = Train;
  readonly ShipIcon = Ship;

  reserva = signal<ReservaResponse | null>(null);
  isLoading = signal(true);
  isDownloadingPdf = signal(false);
  pdfError = signal('');

  ticketData = computed<TicketData>(() => this.ticketService.getTicketData(this.reserva()));

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.isLoading.set(false);
      return;
    }

    this.reservaService.getReservaPorId(id).subscribe({
      next: (data) => {
        this.reserva.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando recibo:', err);
        this.isLoading.set(false);
      },
    });
  }

  goBack() {
    this.router.navigate(['/trips']);
  }

  get userName(): string {
    return this.auth.user()?.name || 'Pasajero';
  }

  getReceiptCode(): string {
    const id = this.reserva()?.id || 0;
    return `JMJ-${String(id).padStart(6, '0')}`;
  }

  getTransportIcon(type: string | undefined | null) {
    const normalized = (type || '').toLowerCase();

    if (normalized.includes('tren')) {
      return this.TrainIcon;
    }

    if (normalized.includes('barco')) {
      return this.ShipIcon;
    }

    return this.PlaneTakeoffIcon;
  }

  getHotelAmount(): number {
    const total = this.reserva()?.precioTotal || 0;
    const transport = this.getTransportAmount();

    return Math.max(total - transport, 0);
  }

  getTransportAmount(): number {
    const type = this.ticketData().tipoTransporte.toLowerCase();

    if (type.includes('tren')) {
      return 50;
    }

    if (type.includes('barco')) {
      return 100;
    }

    return 150;
  }

  getNightsText(): string {
    const noches = this.reserva()?.noches || 0;
    return noches === 1 ? '1 noche' : `${noches} noches`;
  }

  formatDate(value: string | undefined | null): string {
    if (!value) {
      return '';
    }

    return new Date(value)
      .toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace('.', '');
  }

  formatMoney(value: number | undefined | null): string {
    return `${Number(value || 0).toFixed(2)}€`;
  }

  async downloadPdf() {
    const element = document.getElementById('receiptToPdf') as HTMLElement | null;

    if (!element || this.isDownloadingPdf()) {
      return;
    }

    this.isDownloadingPdf.set(true);
    this.pdfError.set('');
    const previousScrollX = window.scrollX;
    const previousScrollY = window.scrollY;

    try {
      const { jsPDF } = await import('jspdf');
      const { toPng } = await import('html-to-image');

      await this.waitForFonts();
      await this.waitForImages(element);
      window.scrollTo(0, 0);

      const rect = element.getBoundingClientRect();
      const captureWidth = Math.ceil(element.scrollWidth || rect.width);
      const captureHeight = Math.ceil(element.scrollHeight || rect.height);
      const pdfWidth = captureWidth;
      const pdfHeight = captureHeight;

      const imageData = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: captureWidth,
        height: captureHeight,
        cacheBust: true,
        style: {
          width: `${captureWidth}px`,
          maxWidth: 'none',
          margin: '0',
        },
      });

      const pdf = new jsPDF({
        orientation: pdfWidth >= pdfHeight ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
        compress: true,
      });

      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`${this.getReceiptCode()} - Recibo ViajesJMJ.pdf`);
    } catch (err) {
      console.error('Error generando PDF:', err);
      this.pdfError.set('No se ha podido generar el PDF. Inténtalo de nuevo.');
    } finally {
      window.scrollTo(previousScrollX, previousScrollY);
      this.isDownloadingPdf.set(false);
    }
  }

  private async waitForFonts(): Promise<void> {
    const documentWithFonts = document as Document & {
      fonts?: {
        ready: Promise<FontFaceSet>;
      };
    };

    if (documentWithFonts.fonts?.ready) {
      await documentWithFonts.fonts.ready;
    }
  }

  private waitForImages(element: HTMLElement): Promise<void> {
    const images = Array.from(element.querySelectorAll('img'));

    if (images.length === 0) {
      return Promise.resolve();
    }

    const imagePromises = images.map((img) => {
      return new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
          return;
        }

        img.onload = () => resolve();
        img.onerror = () => resolve();

        setTimeout(() => resolve(), 3000);
      });
    });

    return Promise.all(imagePromises).then(() => undefined);
  }
}
