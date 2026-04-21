import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  getCityById,
  getCountryById,
  getHotelsByCity,
  City,
  Country,
  Hotel,
} from '../../data/destinations';
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
  route = inject(ActivatedRoute);

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

  city: City | undefined;
  country: Country | undefined;
  allHotels: Hotel[] = [];

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
      const cityId = params.get('cityId');
      if (cityId) {
        this.city = getCityById(cityId);
        if (this.city) {
          this.country = getCountryById(this.city.countryId);
          this.allHotels = getHotelsByCity(cityId);
        }
      }
    });
  }

  get filteredHotels() {
    return this.allHotels.filter((hotel) => {
      if (
        hotel.pricePerNight < this.filters.minPrice ||
        hotel.pricePerNight > this.filters.maxPrice
      )
        return false;
      if (this.filters.budget !== null && this.filters.budget > 0) {
        const totalBasePrice = hotel.pricePerNight * this.filters.days * this.filters.guests;
        if (totalBasePrice > this.filters.budget) return false;
      }
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

  getArray(length: number) {
    return new Array(length);
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
      budget: null,
      guests: 1,
      days: 1,
    };
  }
}
