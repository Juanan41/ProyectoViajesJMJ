import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  searchHotels,
  Hotel,
  getCityById,
  getCountryById,
  City,
  Country,
} from '../../data/destinations';
import {
  LucideAngularModule,
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
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {
  route = inject(ActivatedRoute);

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

  query = '';
  results: Hotel[] = [];

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
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') || '';
      this.results = searchHotels(this.query);
    });
  }

  get filteredResults() {
    return this.results.filter((hotel) => {
      if (
        hotel.pricePerNight < this.filters.minPrice ||
        hotel.pricePerNight > this.filters.maxPrice
      )
        return false;

      if (hotel.rating < this.filters.minRating) return false;
      if (this.filters.category !== 'all' && hotel.category !== this.filters.category) return false;

      if (this.filters.hasPool && !hotel.hasPool) return false;
      if (this.filters.hasGym && !hotel.hasGym) return false;
      if (this.filters.hasSpa && !hotel.hasSpa) return false;
      if (this.filters.hasRestaurant && !hotel.hasRestaurant) return false;
      if (this.filters.hasWifi && !hotel.hasWifi) return false;
      if (this.filters.hasParking && !hotel.hasParking) return false;
      return true;
    });
  }

  // Retorna un array vacío de la longitud indicada (usado para las estrellas HTML)
  getArray(length: number) {
    return new Array(length);
  }

  // Obtiene los detalles de una ciudad por su ID
  getCity(cityId: string): City | undefined {
    return getCityById(cityId);
  }

  // Obtiene el nombre de un país a partir del ID de una ciudad
  getCountryName(cityId: string): string {
    const city = getCityById(cityId);
    if (!city) return '';
    const country = getCountryById(city.countryId);
    return country ? country.name : '';
  }

  // Restaura los filtros a sus valores por defecto
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
    };
  }
}
