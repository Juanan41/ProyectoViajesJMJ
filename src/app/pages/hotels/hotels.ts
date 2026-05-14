import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Star,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Wifi,
  Coffee,
  Wind,
  BedDouble,
} from 'lucide-angular';
import { DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { finalize } from 'rxjs';

type AmenityKey = 'wifi' | 'breakfast' | 'airConditioning' | 'kingBed';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './hotels.html',
})
export class Hotels implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly StarIcon = Star;
  readonly MapPinIcon = MapPin;
  readonly ArrowRightIcon = ArrowRight;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly WifiIcon = Wifi;
  readonly CoffeeIcon = Coffee;
  readonly WindIcon = Wind;
  readonly BedDoubleIcon = BedDouble;

  city = signal<any>(null);
  country = signal<any>(null);
  alojamientos = signal<any[]>([]);
  isLoading = signal(true);

  private cityFilter = '';

  filters = {
    maxPrice: 5000,
    wifi: false,
    breakfast: false,
    airConditioning: false,
    kingBed: false,
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const city = params.get('city');
      this.cityFilter = city ? this.normalizeText(city) : '';
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadData(Number(id));
      }
    });
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  loadData(id: number) {
    this.isLoading.set(true);

    this.destinoService.getDestinoById(id).subscribe({
      next: (data) => {
        if (data) {
          this.city.set({
            name: data.nombre,
            image:
              data.imagenUrl ||
              data.imagen ||
              'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800',
            description: data.descripcion,
          });

          this.country.set({ id: data.continenteId || 1 });
        }
      },
    });

    this.destinoService
      .getAlojamientosByDestino(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.alojamientos.set(data || []),
        error: () => this.alojamientos.set([]),
      });
  }

  get filteredHotels() {
    return this.alojamientos().filter((hotel) => {
      const priceOk = this.getHotelPrice(hotel) <= this.filters.maxPrice;
      if (!priceOk) return false;

      if (this.cityFilter) {
        const city = this.normalizeText(hotel.ciudad || '');
        if (city !== this.cityFilter) return false;
      }

      if (this.filters.wifi && !this.hasAmenity(hotel, 'wifi')) return false;
      if (this.filters.breakfast && !this.hasAmenity(hotel, 'breakfast')) return false;
      if (this.filters.airConditioning && !this.hasAmenity(hotel, 'airConditioning')) return false;
      if (this.filters.kingBed && !this.hasAmenity(hotel, 'kingBed')) return false;

      return true;
    });
  }

  toggleAmenity(amenity: AmenityKey) {
    this.filters[amenity] = !this.filters[amenity];
  }

  clearFilters() {
    this.filters = {
      maxPrice: 5000,
      wifi: false,
      breakfast: false,
      airConditioning: false,
      kingBed: false,
    };
  }

  getHotelPrice(hotel: any): number {
    return Number(hotel?.precioPorNoche || hotel?.precio || 0);
  }

  getHotelImage(hotel: any): string {
    return hotel?.imagenUrl || hotel?.imagen || hotel?.image || 'assets/placeholder.jpg';
  }

  getHotelRating(hotel: any): number {
    return Number(hotel?.estrellas || hotel?.rating || 5);
  }

  getHotelDescription(hotel: any): string {
    return (
      hotel?.descripcion ||
      hotel?.description ||
      `Alojamiento cómodo y bien ubicado en ${hotel?.ciudad || 'tu destino'}.`
    );
  }

  hasAmenity(hotel: any, amenity: AmenityKey): boolean {
    const id = Number(hotel?.id || 0);
    const tipo = String(hotel?.tipo || '').toUpperCase();
    const price = this.getHotelPrice(hotel);

    if (amenity === 'wifi') {
      return id % 5 !== 0;
    }

    if (amenity === 'breakfast') {
      return tipo === 'HOTEL' || tipo === 'RESORT' || id % 2 === 0;
    }

    if (amenity === 'airConditioning') {
      return id % 3 !== 1;
    }

    if (amenity === 'kingBed') {
      return tipo === 'RESORT' || price >= 200 || id % 4 === 0;
    }

    return false;
  }

  getArray(length: number): any[] {
    return Array.from({ length: length || 0 });
  }
}
