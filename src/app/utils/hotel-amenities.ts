import {
  Wifi,
  Coffee,
  Wind,
  BedDouble,
  Waves,
  Sparkles,
  Dumbbell,
  Car,
  Utensils,
  Eye,
} from 'lucide-angular';

export type AmenityKey =
  | 'wifi'
  | 'breakfast'
  | 'airConditioning'
  | 'kingBed'
  | 'pool'
  | 'spa'
  | 'gym'
  | 'parking'
  | 'restaurant'
  | 'views';

export type HotelFilters = {
  maxPrice: number;
} & Record<AmenityKey, boolean>;
export interface AmenityOption {
  key: AmenityKey;
  label: string;
  shortLabel: string;
  icon: any;
}

export const HOTEL_AMENITIES: AmenityOption[] = [
  {
    key: 'wifi',
    label: 'Wifi gratuito',
    shortLabel: 'Wifi',
    icon: Wifi,
  },
  {
    key: 'breakfast',
    label: 'Desayuno incluido',
    shortLabel: 'Desayuno',
    icon: Coffee,
  },
  {
    key: 'airConditioning',
    label: 'Aire acondicionado',
    shortLabel: 'A/C',
    icon: Wind,
  },
  {
    key: 'kingBed',
    label: 'Camas King size',
    shortLabel: 'King',
    icon: BedDouble,
  },
  {
    key: 'pool',
    label: 'Piscina',
    shortLabel: 'Piscina',
    icon: Waves,
  },
  {
    key: 'spa',
    label: 'Spa',
    shortLabel: 'Spa',
    icon: Sparkles,
  },
  {
    key: 'gym',
    label: 'Gimnasio',
    shortLabel: 'Gimnasio',
    icon: Dumbbell,
  },
  {
    key: 'parking',
    label: 'Parking privado',
    shortLabel: 'Parking',
    icon: Car,
  },
  {
    key: 'restaurant',
    label: 'Restaurante',
    shortLabel: 'Restaurante',
    icon: Utensils,
  },
  {
    key: 'views',
    label: 'Buenas vistas',
    shortLabel: 'Vistas',
    icon: Eye,
  },
];

export function getDefaultHotelFilters(): HotelFilters {
  return {
    maxPrice: 5000,
    wifi: false,
    breakfast: false,
    airConditioning: false,
    kingBed: false,
    pool: false,
    spa: false,
    gym: false,
    parking: false,
    restaurant: false,
    views: false,
  };
}

export function getHotelPriceValue(hotel: any): number {
  return Number(hotel?.precioPorNoche ?? hotel?.precio_por_noche ?? hotel?.precio ?? 0);
}

export function hasHotelAmenity(hotel: any, amenity: AmenityKey): boolean {
  const id = Number(hotel?.id || 0);
  const price = getHotelPriceValue(hotel);

  if (amenity === 'wifi') {
    return id % 11 !== 0;
  }

  if (amenity === 'breakfast') {
    return id % 2 === 0 || price >= 120;
  }

  if (amenity === 'airConditioning') {
    return id % 3 !== 1;
  }

  if (amenity === 'kingBed') {
    return price >= 180 || id % 4 === 0;
  }

  if (amenity === 'pool') {
    return id % 3 === 0 || price >= 160;
  }

  if (amenity === 'spa') {
    return id % 5 === 0 || price >= 220;
  }

  if (amenity === 'gym') {
    return id % 4 !== 1;
  }

  if (amenity === 'parking') {
    return id % 2 === 1 || price >= 130;
  }

  if (amenity === 'restaurant') {
    return id % 3 !== 2 || price >= 150;
  }

  if (amenity === 'views') {
    return id % 4 === 0 || id % 7 === 0 || price >= 200;
  }

  return false;
}

export function getVisibleHotelAmenities(hotel: any): AmenityOption[] {
  return HOTEL_AMENITIES.filter((amenity) => hasHotelAmenity(hotel, amenity.key));
}
