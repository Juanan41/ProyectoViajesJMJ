import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  ArrowLeft,
  MapPin,
  Search,
  Star,
  SlidersHorizontal,
} from 'lucide-angular';
import { DestinoDTO, DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { getHotelPriceValue, getVisibleHotelAmenities } from '../../utils/hotel-amenities';

type HotelSort = 'nombre' | 'precioAsc' | 'precioDesc' | 'rating';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class Hotels implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly MapPinIcon = MapPin;
  readonly SearchIcon = Search;
  readonly StarIcon = Star;
  readonly SlidersIcon = SlidersHorizontal;

  destino = signal<DestinoDTO | null>(null);
  hoteles = signal<any[]>([]);
  isLoading = signal(true);
  loadError = signal('');

  search = '';
  sort: HotelSort = 'nombre';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!Number.isFinite(id) || id <= 0) {
        this.loadError.set('No se pudo identificar el destino.');
        this.isLoading.set(false);
        return;
      }

      this.loadDestinationHotels(id);
    });
  }

  private loadDestinationHotels(destinoId: number): void {
    this.isLoading.set(true);
    this.loadError.set('');
    this.destino.set(null);
    this.hoteles.set([]);

    this.destinoService.getDestinoById(destinoId).subscribe({
      next: (destino) => this.destino.set(destino),
      error: () => this.destino.set(null),
    });

    this.destinoService.getAlojamientosByDestino(destinoId).subscribe({
      next: (hoteles) => {
        this.hoteles.set(hoteles || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando hoteles del destino', err);
        this.hoteles.set([]);
        this.loadError.set('No se pudieron cargar los hoteles de este destino.');
        this.isLoading.set(false);
      },
    });
  }

  get filteredHoteles(): any[] {
    const search = this.normalize(this.search);

    const filtered = this.hoteles().filter((hotel) => {
      if (!search) return true;

      return (
        this.normalize(hotel.nombre).includes(search) ||
        this.normalize(hotel.ciudad).includes(search) ||
        this.normalize(hotel.pais).includes(search) ||
        this.normalize(hotel.tipo).includes(search)
      );
    });

    return filtered.sort((a, b) => {
      if (this.sort === 'precioAsc') {
        return this.getHotelPrice(a) - this.getHotelPrice(b);
      }

      if (this.sort === 'precioDesc') {
        return this.getHotelPrice(b) - this.getHotelPrice(a);
      }

      if (this.sort === 'rating') {
        return this.getHotelRating(b) - this.getHotelRating(a);
      }

      return String(a.nombre || '').localeCompare(String(b.nombre || ''));
    });
  }

  getHeroImage(): string {
    return (
      this.destino()?.imagenUrl ||
      this.destino()?.imagen ||
      this.hoteles()[0]?.imagenUrl ||
      this.hoteles()[0]?.imagen ||
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop'
    );
  }

  getDestinationTitle(): string {
    return this.destino()?.nombre || this.hoteles()[0]?.destinoNombre || 'Destino';
  }

  getDestinationLocation(): string {
    const city = this.destino()?.nombre || this.hoteles()[0]?.ciudad || '';
    const country = this.destino()?.pais || this.hoteles()[0]?.pais || '';

    if (city && country) return `${city}, ${country}`;
    return city || country || 'Ubicacion no disponible';
  }

  getHotelImage(hotel: any): string {
    return (
      hotel?.imagenUrl ||
      hotel?.imagen ||
      hotel?.image ||
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop'
    );
  }

  getHotelPrice(hotel: any): number {
    return getHotelPriceValue(hotel);
  }

  getHotelRating(hotel: any): number {
    return Number(hotel?.rating ?? hotel?.estrellas ?? 0);
  }

  hasHotelReviews(hotel: any): boolean {
    return Number(hotel?.totalOpiniones ?? hotel?.reviewCount ?? 0) > 0 && this.getHotelRating(hotel) > 0;
  }

  getVisibleAmenities(hotel: any) {
    return getVisibleHotelAmenities(hotel).slice(0, 4);
  }

  getArray(length: number | undefined | null): any[] {
    const safeLength = Math.max(0, Math.min(5, Math.round(Number(length || 0))));
    return Array.from({ length: safeLength });
  }

  resetFilters(): void {
    this.search = '';
    this.sort = 'nombre';
  }

  private normalize(value: any): string {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
