import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ElementRef,
  ViewChild,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DestinoApi } from '../../data/destino-api';
import { DestinosApiService } from '../../services/destinos-api.service';

interface Destination {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-destino-carousel',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './destino-carousel.html',
  styleUrl: './destino-carousel.css',
})
export class DestinoCarousel implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;

  private destinosApi = inject(DestinosApiService);
  private cdr = inject(ChangeDetectorRef);
  private autoplayId?: ReturnType<typeof setInterval>;

  loading = true;
  error = '';
  destinations: Destination[] = [];

  ngOnInit(): void {
    this.cargarDestinos();
  }

  private cargarDestinos(): void {
    console.log('Llamando a la API de destinos...');

    this.destinosApi.obtenerDestinos().subscribe({
      next: (data: DestinoApi[]) => {
        console.log('Respuesta API:', data);

        this.destinations = data.map((destino) => ({
          id: destino.id,
          title: `${destino.nombre}, ${destino.pais}`,
          image:
            destino.imagen && destino.imagen.trim() !== ''
              ? destino.imagen
              : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
        }));

        this.loading = false;
        this.error = '';

        console.log('Destinations finales:', this.destinations);
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Error cargando destinos:', err);
        this.error = 'No se pudieron cargar los destinos';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  ngAfterViewInit(): void {
    this.autoplayId = setInterval(() => {
      if (!this.carouselRef || this.destinations.length <= 1) return;

      const el = this.carouselRef.nativeElement;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
      }
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
    }
  }
}
