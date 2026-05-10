import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinoService } from '../../services/destino.service';
import {
  LucideAngularModule,
  ArrowLeft,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Dumbbell,
  Waves,
  Utensils,
  CarFront,
  SlidersHorizontal,
  X,
} from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

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
  readonly StarIcon = Star;
  readonly MapPinIcon = MapPin;
  readonly WifiIcon = Wifi;
  readonly CoffeeIcon = Coffee;
  readonly DumbbellIcon = Dumbbell;
  readonly WavesIcon = Waves;
  readonly UtensilsIcon = Utensils;
  readonly CarFrontIcon = CarFront;
  readonly SlidersHorizontalIcon = SlidersHorizontal;
  readonly XIcon = X;

  city = signal<any>(null);
  country = signal<any>(null);
  allHotels = signal<any[]>([]);

  isFilterOpen = false;

  filters = {
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
    category: 'all',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: false,
    hasWifi: false,
    hasParking: false,
    budget: null as number | null,
    guests: 1,
    days: 1,
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('cityId'));

      if (id) {
        this.loadData(id);
      }
    });
  }

  private loadData(id: number) {
    this.city.set({
      id,
      name: 'Destino',
      nombre: 'Destino',
      description: 'Alojamientos disponibles',
      descripcion: 'Alojamientos disponibles',
      image: 'https://picsum.photos/seed/destino-' + id + '/1200/600',
      imagen: 'https://picsum.photos/seed/destino-' + id + '/1200/600',
    });

    this.country.set({ id: 1 });

    this.destinoService.getDestinoById(id).subscribe({
      next: (dest: any) => {
        const continenteId = this.obtenerContinenteId(dest.continente || dest.continenteNombre);

        this.city.set({
          ...dest,
          name: dest.nombre,
          image: dest.imagen,
          description: dest.descripcion,
        });

        this.country.set({ id: continenteId });
      },
      error: (err) => console.error('Error cargando destino:', err),
    });

    this.destinoService.getAlojamientosByDestino(id).subscribe({
      next: (data: any[]) => {
        const hoteles = data.map((hotel) => ({
          ...hotel,
          name: hotel.nombre,
          image: hotel.imagen,
          description:
            hotel.descripcion ||
            `${hotel.tipo} en ${hotel.ciudad}, ${hotel.pais}`,
          rating: hotel.rating || 4,
          precioPorNoche: hotel.precioPorNoche || hotel.precio || 0,
          hasWifi: true,
          hasRestaurant: true,
          hasParking: true,
        }));

        this.allHotels.set(hoteles);
      },
      error: (err) => console.error('Error cargando alojamientos:', err),
    });
  }

  private obtenerContinenteId(nombreContinente: string): number {
    const nombre = this.normalizar(nombreContinente || '');

    const mapa: Record<string, number> = {
      europa: 1,
      asia: 2,
      africa: 3,
      oceania: 4,
      'america del norte': 5,
      'america del sur': 6,
    };

    return mapa[nombre] || 1;
  }

  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  get filteredHotels() {
    return this.allHotels().filter((hotel) => {
      if (!this.matchesPrice(hotel)) return false;
      if (!this.matchesBudget(hotel)) return false;
      if (!this.matchesRatingAndCategory(hotel)) return false;
      if (!this.matchesAmenities(hotel)) return false;
      return true;
    });
  }

  private matchesPrice(hotel: any): boolean {
    const precio = hotel.precioPorNoche || hotel.pricePerNight || hotel.precio || 0;
    return precio >= this.filters.minPrice && precio <= this.filters.maxPrice;
  }

  private matchesBudget(hotel: any): boolean {
    if (this.filters.budget === null || this.filters.budget <= 0) return true;
    const precio = hotel.precioPorNoche || hotel.pricePerNight || hotel.precio || 0;
    const totalBasePrice = precio * this.filters.days * this.filters.guests;
    return totalBasePrice <= this.filters.budget;
  }

  private matchesRatingAndCategory(hotel: any): boolean {
    if ((hotel.rating || 0) < this.filters.minRating) return false;
    if (this.filters.category !== 'all' && hotel.tipo !== this.filters.category) return false;
    return true;
  }

  private matchesAmenities(hotel: any): boolean {
    if (this.filters.hasPool && !hotel.hasPool) return false;
    if (this.filters.hasGym && !hotel.hasGym) return false;
    if (this.filters.hasSpa && !hotel.hasSpa) return false;
    if (this.filters.hasRestaurant && !hotel.hasRestaurant) return false;
    if (this.filters.hasWifi && !hotel.hasWifi) return false;
    if (this.filters.hasParking && !hotel.hasParking) return false;
    return true;
  }

  getArray(length: number) {
    return new Array(length || 0);
  }

  clearFilters() {
    this.filters = {
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      category: 'all',
      hasPool: false,
      hasGym: false,
      hasSpa: false,
      hasRestaurant: false,
      hasWifi: false,
      hasParking: false,
      budget: null as number | null,
      guests: 1,
      days: 1,
    };
  }
}
