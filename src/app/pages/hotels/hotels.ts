// ProyectoViajesJMJ - pages\hotels\hotels.ts
// Responsabilidad: catalogo de alojamientos, habitaciones y detalle hotelero.
// Nota profesional: Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Star, MapPin, ArrowRight, ArrowLeft } from 'lucide-angular';
import { DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { finalize } from 'rxjs';
import {
  AmenityKey,
  HOTEL_AMENITIES,
  HotelFilters,
  getDefaultHotelFilters,
  getHotelPriceValue,
  getVisibleHotelAmenities,
  hasHotelAmenity,
} from '../../utils/hotel-amenities';

/**
 * Documento profesional: clase principal del archivo.
 * Representa el catalogo hotelero, sus habitaciones y las opciones que se pueden reservar.
 */
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

  readonly amenityOptions = HOTEL_AMENITIES;

  city = signal<any>(null);
  country = signal<any>(null);
  alojamientos = signal<any[]>([]);
  isLoading = signal(true);

  private cityFilter = '';

  filters: HotelFilters = getDefaultHotelFilters();

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
              'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop',
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

      for (const amenity of this.amenityOptions) {
        if (this.filters[amenity.key] && !this.hasAmenity(hotel, amenity.key)) {
          return false;
        }
      }

      return true;
    });
  }

  toggleAmenity(amenity: AmenityKey) {
    this.filters = {
      ...this.filters,
      [amenity]: !this.filters[amenity],
    };
  }

  isAmenitySelected(amenity: AmenityKey): boolean {
    return this.filters[amenity];
  }

  clearFilters() {
    this.filters = getDefaultHotelFilters();
  }

  getHotelPrice(hotel: any): number {
    return getHotelPriceValue(hotel);
  }

  getHotelImage(hotel: any): string {
    return hotel?.imagenUrl || hotel?.imagen || hotel?.image || 'assets/placeholder.jpg';
  }

  getHotelRating(hotel: any): number {
    return Number(hotel?.rating ?? hotel?.estrellas ?? 0);
  }

  hasHotelReviews(hotel: any): boolean {
    return Number(hotel?.totalOpiniones ?? hotel?.reviewCount ?? 0) > 0 && this.getHotelRating(hotel) > 0;
  }

  getHotelDescription(hotel: any): string {
    return (
      hotel?.descripcion ||
      hotel?.description ||
      `Hotel cómodo y bien ubicado en ${hotel?.ciudad || 'tu destino'}.`
    );
  }

  getVisibleAmenities(hotel: any) {
    return getVisibleHotelAmenities(hotel);
  }

  hasAmenity(hotel: any, amenity: AmenityKey): boolean {
    return hasHotelAmenity(hotel, amenity);
  }

  getArray(length: number): any[] {
    const safeLength = Math.max(0, Math.min(5, Math.round(Number(length || 0))));
    return Array.from({ length: safeLength });
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
