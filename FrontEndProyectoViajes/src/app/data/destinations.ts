import { fetchRemoteStore, putRemoteStore } from './persistence-api';
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  hotelName?: string;
  hotelId?: string;
}

export type TransportType = 'avion' | 'tren' | 'barco';
export type BookingStatus = 'active' | 'canceled';

export interface BookingTransport {
  type: TransportType;
  name: string;
  time: string;
  seat: string;
  gate: string;
  platform?: string | null;
  terminal?: string | null;
}

export interface BookingRecord {
  id: string;
  userEmail?: string;
  hotelId: string;
  hotelName: string;
  cityId: string;
  countryId: string;
  destination: string;
  image: string;
  bookingDate: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  roomType: string;
  totalAmount: number;
  paymentMethod: string;
  paymentDate: string;
  confirmationCode: string;
  transport: BookingTransport;
  status?: BookingStatus;
  canceledAt?: string;
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  image: string;
  description: string;
  amenities: string[];
  cityId: string;
  category: string;
  hasPool: boolean;
  hasGym: boolean;
  hasSpa: boolean;
  hasRestaurant: boolean;
  hasWifi: boolean;
  hasParking: boolean;
  additionalPhotos?: string[];
  reviews?: Review[];
}

export interface City {
  id: string;
  name: string;
  countryId: string;
  image: string;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  continentId: string;
  flag: string;
  image: string;
}

export interface Continent {
  id: string;
  name: string;
  image: string;
  description: string;
}

const hotelImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
const resortImage = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800';
const cityImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800';

export const continents: Continent[] = [
  {
    id: 'europa',
    name: 'Europa',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
    description: 'Historia, cultura y arquitectura milenaria',
  },
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
    description: 'Tradición ancestral, tecnología y grandes contrastes',
  },
  {
    id: 'africa',
    name: 'África',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    description: 'Safari, desiertos, playas y culturas ancestrales',
  },
  {
    id: 'oceania',
    name: 'Oceanía',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    description: 'Playas paradisíacas y naturaleza única',
  },
  {
    id: 'america-norte',
    name: 'América del Norte',
    image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800',
    description: 'Grandes ciudades, cultura urbana y playas caribeñas',
  },
  {
    id: 'america-sur',
    name: 'América del Sur',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    description: 'Naturaleza, historia, gastronomía y cultura latina',
  },
];

export const countries: Country[] = [
  // Europa
  {
    id: 'espana',
    name: 'España',
    continentId: 'europa',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800',
  },
  {
    id: 'francia',
    name: 'Francia',
    continentId: 'europa',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  },
  {
    id: 'italia',
    name: 'Italia',
    continentId: 'europa',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800',
  },
  {
    id: 'reino-unido',
    name: 'Reino Unido',
    continentId: 'europa',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  },
  {
    id: 'grecia',
    name: 'Grecia',
    continentId: 'europa',
    flag: '🇬🇷',
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800',
  },
  {
    id: 'austria',
    name: 'Austria',
    continentId: 'europa',
    flag: '🇦🇹',
    image: 'https://images.unsplash.com/photo-1516550893885-985cfd0f5411?w=800',
  },

  // Asia
  {
    id: 'japon',
    name: 'Japón',
    continentId: 'asia',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
  },
  {
    id: 'tailandia',
    name: 'Tailandia',
    continentId: 'asia',
    flag: '🇹🇭',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
  },
  {
    id: 'china',
    name: 'China',
    continentId: 'asia',
    flag: '🇨🇳',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
  },
  {
    id: 'emiratos-arabes-unidos',
    name: 'Emiratos Árabes Unidos',
    continentId: 'asia',
    flag: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  },
  {
    id: 'india',
    name: 'India',
    continentId: 'asia',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  },
  {
    id: 'corea-del-sur',
    name: 'Corea del Sur',
    continentId: 'asia',
    flag: '🇰🇷',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800',
  },

  // África
  {
    id: 'egipto',
    name: 'Egipto',
    continentId: 'africa',
    flag: '🇪🇬',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800',
  },
  {
    id: 'marruecos',
    name: 'Marruecos',
    continentId: 'africa',
    flag: '🇲🇦',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
  },
  {
    id: 'kenia',
    name: 'Kenia',
    continentId: 'africa',
    flag: '🇰🇪',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    continentId: 'africa',
    flag: '🇹🇿',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800',
  },
  {
    id: 'sudafrica',
    name: 'Sudáfrica',
    continentId: 'africa',
    flag: '🇿🇦',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
  },

  // Oceanía
  {
    id: 'australia',
    name: 'Australia',
    continentId: 'oceania',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
  },
  {
    id: 'nueva-zelanda',
    name: 'Nueva Zelanda',
    continentId: 'oceania',
    flag: '🇳🇿',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800',
  },
  {
    id: 'fiyi',
    name: 'Fiyi',
    continentId: 'oceania',
    flag: '🇫🇯',
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800',
  },
  {
    id: 'polinesia-francesa',
    name: 'Polinesia Francesa',
    continentId: 'oceania',
    flag: '🇵🇫',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  },

  // América del Norte
  {
    id: 'estados-unidos',
    name: 'Estados Unidos',
    continentId: 'america-norte',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
  },
  {
    id: 'mexico',
    name: 'México',
    continentId: 'america-norte',
    flag: '🇲🇽',
    image: 'https://images.unsplash.com/photo-1518659664331-862e3a95a63b?w=800',
  },
  {
    id: 'canada',
    name: 'Canadá',
    continentId: 'america-norte',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800',
  },

  // América del Sur
  {
    id: 'brasil',
    name: 'Brasil',
    continentId: 'america-sur',
    flag: '🇧🇷',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
  },
  {
    id: 'argentina',
    name: 'Argentina',
    continentId: 'america-sur',
    flag: '🇦🇷',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
  },
  {
    id: 'peru',
    name: 'Perú',
    continentId: 'america-sur',
    flag: '🇵🇪',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
  },
  {
    id: 'colombia',
    name: 'Colombia',
    continentId: 'america-sur',
    flag: '🇨🇴',
    image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=800',
  },
  {
    id: 'chile',
    name: 'Chile',
    continentId: 'america-sur',
    flag: '🇨🇱',
    image: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800',
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    continentId: 'america-sur',
    flag: '🇺🇾',
    image: 'https://images.unsplash.com/photo-1581281863883-2469417a1668?w=800',
  },
];

export const cities: City[] = [
  // Europa
  {
    id: 'madrid',
    name: 'Madrid',
    countryId: 'espana',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
    description: 'Capital española, cultura, gastronomía y vida urbana',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    countryId: 'espana',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    description: 'Mediterráneo, arquitectura modernista y playa',
  },
  {
    id: 'paris',
    name: 'París',
    countryId: 'francia',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800',
    description: 'Ciudad del amor, arte y moda',
  },
  {
    id: 'roma',
    name: 'Roma',
    countryId: 'italia',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    description: 'Historia romana y cultura italiana',
  },
  {
    id: 'londres',
    name: 'Londres',
    countryId: 'reino-unido',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    description: 'Ciudad moderna con historia',
  },
  {
    id: 'atenas',
    name: 'Atenas',
    countryId: 'grecia',
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800',
    description: 'Cuna de la civilización griega',
  },
  {
    id: 'viena',
    name: 'Viena',
    countryId: 'austria',
    image: 'https://images.unsplash.com/photo-1516550893885-985cfd0f5411?w=800',
    description: 'Elegancia, música y cultura imperial',
  },

  // Asia
  {
    id: 'tokio',
    name: 'Tokio',
    countryId: 'japon',
    image: 'https://images.unsplash.com/photo-1641558996066-fcf78962c30a?w=800',
    description: 'Tecnología avanzada, cultura tradicional y vida urbana vibrante',
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    countryId: 'tailandia',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    description: 'Templos, mercados y vida nocturna exótica',
  },
  {
    id: 'pekin',
    name: 'Pekín',
    countryId: 'china',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    description: 'Historia imperial, cultura china y monumentos icónicos',
  },
  {
    id: 'dubai',
    name: 'Dubái',
    countryId: 'emiratos-arabes-unidos',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Lujo, rascacielos y experiencias en el desierto',
  },
  {
    id: 'nueva-delhi',
    name: 'Nueva Delhi',
    countryId: 'india',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    description: 'Cultura milenaria, gastronomía y contrastes urbanos',
  },
  {
    id: 'seul',
    name: 'Seúl',
    countryId: 'corea-del-sur',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800',
    description: 'Tecnología, cultura moderna y tradición coreana',
  },

  // África
  {
    id: 'el-cairo',
    name: 'El Cairo',
    countryId: 'egipto',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800',
    description: 'Historia antigua, pirámides y cultura egipcia',
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    countryId: 'marruecos',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800',
    description: 'Mercados tradicionales, cultura marroquí y arquitectura exótica',
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    countryId: 'kenia',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    description: 'Safari africano y naturaleza salvaje',
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    countryId: 'tanzania',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800',
    description: 'Playas paradisíacas y aguas cristalinas',
  },
  {
    id: 'sahara',
    name: 'Sahara',
    countryId: 'marruecos',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    description: 'Aventura en el desierto y paisajes únicos',
  },
  {
    id: 'ciudad-del-cabo',
    name: 'Ciudad del Cabo',
    countryId: 'sudafrica',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    description: 'Naturaleza, montaña y costa espectacular',
  },

  // Oceanía
  {
    id: 'sidney',
    name: 'Sidney',
    countryId: 'australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    description: 'Ópera icónica, playas y cultura urbana australiana',
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    countryId: 'australia',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800',
    description: 'Arte, cultura y vida cosmopolita',
  },
  {
    id: 'auckland',
    name: 'Auckland',
    countryId: 'nueva-zelanda',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800',
    description: 'Volcanes, naturaleza y aventura',
  },
  {
    id: 'fiyi',
    name: 'Fiyi',
    countryId: 'fiyi',
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800',
    description: 'Playas paradisíacas y relax total',
  },
  {
    id: 'bora-bora',
    name: 'Bora Bora',
    countryId: 'polinesia-francesa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    description: 'Destino romántico con aguas turquesas y lujo',
  },
  {
    id: 'perth',
    name: 'Perth',
    countryId: 'australia',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800',
    description: 'Ciudad moderna con naturaleza salvaje',
  },

  // América del Norte
  {
    id: 'nueva-york',
    name: 'Nueva York',
    countryId: 'estados-unidos',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'Rascacielos, cultura urbana y la ciudad que nunca duerme',
  },
  {
    id: 'ciudad-de-mexico',
    name: 'Ciudad de México',
    countryId: 'mexico',
    image: 'https://images.unsplash.com/photo-1518659664331-862e3a95a63b?w=800',
    description: 'Historia, cultura y gastronomía mexicana',
  },
  {
    id: 'toronto',
    name: 'Toronto',
    countryId: 'canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
    description: 'Ciudad moderna con multiculturalidad y rascacielos',
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    countryId: 'estados-unidos',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    description: 'Puentes icónicos, tecnología y cultura alternativa',
  },
  {
    id: 'cancun',
    name: 'Cancún',
    countryId: 'mexico',
    image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800',
    description: 'Playas paradisíacas y relax en el Caribe',
  },
  {
    id: 'chicago',
    name: 'Chicago',
    countryId: 'estados-unidos',
    image: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800',
    description: 'Arquitectura, música y ambiente urbano',
  },

  // América del Sur
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    countryId: 'brasil',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    description: 'Playas, carnaval y paisajes icónicos como el Cristo Redentor',
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    countryId: 'argentina',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
    description: 'Cultura, tango y gastronomía argentina',
  },
  {
    id: 'cusco',
    name: 'Cusco',
    countryId: 'peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    description: 'Ciudad andina, historia inca y acceso a Machu Picchu',
  },
  {
    id: 'cartagena',
    name: 'Cartagena',
    countryId: 'colombia',
    image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=800',
    description: 'Ciudad colonial con playas y encanto caribeño',
  },
  {
    id: 'santiago-de-chile',
    name: 'Santiago de Chile',
    countryId: 'chile',
    image: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800',
    description: 'Ciudad moderna rodeada de montañas y naturaleza',
  },
  {
    id: 'montevideo',
    name: 'Montevideo',
    countryId: 'uruguay',
    image: 'https://images.unsplash.com/photo-1581281863883-2469417a1668?w=800',
    description: 'Ciudad costera tranquila con cultura y relax',
  },
];

function createHotel(
  id: string,
  name: string,
  cityId: string,
  pricePerNight: number,
  category: string,
  image: string,
  description: string,
): Hotel {
  return {
    id,
    name,
    rating: category === 'luxury' ? 5 : 4,
    pricePerNight,
    image,
    description,
    amenities: ['Wifi gratuito', 'Restaurante', 'Recepción 24 horas', 'Aire acondicionado'],
    cityId,
    category,
    hasPool: category === 'resort' || category === 'luxury',
    hasGym: true,
    hasSpa: category === 'resort' || category === 'luxury',
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    ],
  };
}

export const hotels: Hotel[] = [
  // Europa
  createHotel('madrid-central-hotel', 'Madrid Central Hotel', 'madrid', 150, 'hotel', hotelImage, 'Hotel céntrico en Madrid.'),
  createHotel('barcelona-beach-resort', 'Barcelona Beach Resort', 'barcelona', 180, 'resort', resortImage, 'Resort cerca de la playa en Barcelona.'),
  createHotel('paris-luxury-hotel', 'Paris Luxury Hotel', 'paris', 220, 'luxury', hotelImage, 'Hotel de lujo en París.'),
  createHotel('eiffel-view-stay', 'Eiffel View Stay', 'paris', 200, 'hotel', resortImage, 'Alojamiento con ambiente parisino.'),
  createHotel('roma-centro-hotel', 'Roma Centro Hotel', 'roma', 170, 'hotel', hotelImage, 'Hotel céntrico en Roma.'),
  createHotel('colosseum-view-stay', 'Colosseum View Stay', 'roma', 160, 'hotel', resortImage, 'Alojamiento con encanto romano.'),
  createHotel('london-central-hotel', 'London Central Hotel', 'londres', 210, 'hotel', hotelImage, 'Hotel céntrico en Londres.'),
  createHotel('big-ben-view-stay', 'Big Ben View Stay', 'londres', 190, 'hotel', resortImage, 'Alojamiento cerca del Big Ben.'),
  createHotel('athens-acropolis-hotel', 'Athens Acropolis Hotel', 'atenas', 140, 'hotel', hotelImage, 'Hotel cerca de la Acrópolis.'),
  createHotel('greek-paradise-stay', 'Greek Paradise Stay', 'atenas', 130, 'hotel', resortImage, 'Estancia tranquila en Atenas.'),
  createHotel('vienna-palace-hotel', 'Vienna Palace Hotel', 'viena', 180, 'hotel', hotelImage, 'Hotel elegante en Viena.'),
  createHotel('danube-riverside-stay', 'Danube Riverside Stay', 'viena', 170, 'hotel', resortImage, 'Alojamiento junto al Danubio.'),

  // Asia
  createHotel('tokyo-central-hotel', 'Tokyo Central Hotel', 'tokio', 210, 'hotel', hotelImage, 'Hotel céntrico en Tokio.'),
  createHotel('shinjuku-skyline-resort', 'Shinjuku Skyline Resort', 'tokio', 240, 'resort', resortImage, 'Resort urbano en Shinjuku.'),
  createHotel('bangkok-palace-hotel', 'Bangkok Palace Hotel', 'bangkok', 130, 'hotel', hotelImage, 'Hotel en Bangkok.'),
  createHotel('chao-phraya-riverside-resort', 'Chao Phraya Riverside Resort', 'bangkok', 160, 'resort', resortImage, 'Resort junto al río Chao Phraya.'),
  createHotel('beijing-imperial-hotel', 'Beijing Imperial Hotel', 'pekin', 150, 'hotel', hotelImage, 'Hotel en Pekín.'),
  createHotel('forbidden-city-stay', 'Forbidden City Stay', 'pekin', 140, 'hotel', resortImage, 'Estancia cerca de la Ciudad Prohibida.'),
  createHotel('dubai-luxury-tower-hotel', 'Dubai Luxury Tower Hotel', 'dubai', 300, 'luxury', hotelImage, 'Hotel de lujo en Dubái.'),
  createHotel('burj-view-resort', 'Burj View Resort', 'dubai', 350, 'resort', resortImage, 'Resort con vistas al Burj Khalifa.'),
  createHotel('delhi-heritage-hotel', 'Delhi Heritage Hotel', 'nueva-delhi', 120, 'hotel', hotelImage, 'Hotel cultural en Nueva Delhi.'),
  createHotel('lotus-garden-stay', 'Lotus Garden Stay', 'nueva-delhi', 110, 'hotel', resortImage, 'Estancia tranquila en Nueva Delhi.'),
  createHotel('seoul-city-hotel', 'Seoul City Hotel', 'seul', 180, 'hotel', hotelImage, 'Hotel urbano en Seúl.'),
  createHotel('han-river-view-resort', 'Han River View Resort', 'seul', 210, 'resort', resortImage, 'Resort con vistas al río Han.'),

  // África
  createHotel('cairo-pyramids-hotel', 'Cairo Pyramids Hotel', 'el-cairo', 140, 'hotel', hotelImage, 'Hotel cerca de las pirámides.'),
  createHotel('nile-view-resort', 'Nile View Resort', 'el-cairo', 170, 'resort', resortImage, 'Resort con vistas al Nilo.'),
  createHotel('marrakech-riad-hotel', 'Marrakech Riad Hotel', 'marrakech', 120, 'hotel', hotelImage, 'Riad tradicional en Marrakech.'),
  createHotel('atlas-mountain-resort', 'Atlas Mountain Resort', 'marrakech', 150, 'resort', resortImage, 'Resort cerca del Atlas.'),
  createHotel('safari-lodge-nairobi', 'Safari Lodge Nairobi', 'nairobi', 180, 'hotel', hotelImage, 'Alojamiento para safari en Nairobi.'),
  createHotel('savannah-adventure-resort', 'Savannah Adventure Resort', 'nairobi', 210, 'resort', resortImage, 'Resort de aventura en la sabana.'),
  createHotel('zanzibar-beach-hotel', 'Zanzibar Beach Hotel', 'zanzibar', 200, 'hotel', hotelImage, 'Hotel de playa en Zanzibar.'),
  createHotel('ocean-paradise-resort', 'Ocean Paradise Resort', 'zanzibar', 240, 'resort', resortImage, 'Resort frente al océano.'),
  createHotel('desert-camp-sahara', 'Desert Camp Sahara', 'sahara', 100, 'hotel', hotelImage, 'Campamento en el desierto del Sahara.'),
  createHotel('dunes-luxury-camp', 'Dunes Luxury Camp', 'sahara', 130, 'resort', resortImage, 'Campamento de lujo entre dunas.'),
  createHotel('cape-town-city-hotel', 'Cape Town City Hotel', 'ciudad-del-cabo', 190, 'hotel', hotelImage, 'Hotel urbano en Ciudad del Cabo.'),
  createHotel('table-mountain-view-resort', 'Table Mountain View Resort', 'ciudad-del-cabo', 220, 'resort', resortImage, 'Resort con vistas a Table Mountain.'),

  // Oceanía
  createHotel('sydney-harbour-hotel', 'Sydney Harbour Hotel', 'sidney', 240, 'hotel', hotelImage, 'Hotel en el puerto de Sidney.'),
  createHotel('bondi-beach-resort', 'Bondi Beach Resort', 'sidney', 280, 'resort', resortImage, 'Resort cerca de Bondi Beach.'),
  createHotel('melbourne-city-hotel', 'Melbourne City Hotel', 'melbourne', 220, 'hotel', hotelImage, 'Hotel urbano en Melbourne.'),
  createHotel('yarra-river-resort', 'Yarra River Resort', 'melbourne', 260, 'resort', resortImage, 'Resort junto al río Yarra.'),
  createHotel('auckland-sky-hotel', 'Auckland Sky Hotel', 'auckland', 210, 'hotel', hotelImage, 'Hotel en Auckland.'),
  createHotel('harbour-view-resort', 'Harbour View Resort', 'auckland', 250, 'resort', resortImage, 'Resort con vistas al puerto.'),
  createHotel('fiji-island-hotel', 'Fiji Island Hotel', 'fiyi', 300, 'hotel', hotelImage, 'Hotel en Fiyi.'),
  createHotel('coral-reef-resort', 'Coral Reef Resort', 'fiyi', 350, 'resort', resortImage, 'Resort junto al arrecife.'),
  createHotel('bora-bora-luxury-villas', 'Bora Bora Luxury Villas', 'bora-bora', 400, 'luxury', hotelImage, 'Villas de lujo en Bora Bora.'),
  createHotel('overwater-bungalow-resort', 'Overwater Bungalow Resort', 'bora-bora', 450, 'resort', resortImage, 'Bungalows sobre el agua.'),
  createHotel('perth-city-hotel', 'Perth City Hotel', 'perth', 200, 'hotel', hotelImage, 'Hotel urbano en Perth.'),
  createHotel('sunset-coast-resort', 'Sunset Coast Resort', 'perth', 230, 'resort', resortImage, 'Resort en la costa de Perth.'),

  // América del Norte
  createHotel('manhattan-central-hotel', 'Manhattan Central Hotel', 'nueva-york', 300, 'hotel', hotelImage, 'Hotel en Manhattan.'),
  createHotel('times-square-luxury-resort', 'Times Square Luxury Resort', 'nueva-york', 350, 'resort', resortImage, 'Resort urbano en Times Square.'),
  createHotel('mexico-city-downtown-hotel', 'Mexico City Downtown Hotel', 'ciudad-de-mexico', 150, 'hotel', hotelImage, 'Hotel en el centro de Ciudad de México.'),
  createHotel('zocalo-heritage-resort', 'Zócalo Heritage Resort', 'ciudad-de-mexico', 180, 'resort', resortImage, 'Resort histórico junto al Zócalo.'),
  createHotel('toronto-city-hotel', 'Toronto City Hotel', 'toronto', 220, 'hotel', hotelImage, 'Hotel urbano en Toronto.'),
  createHotel('cn-tower-view-resort', 'CN Tower View Resort', 'toronto', 260, 'resort', resortImage, 'Resort con vistas a la CN Tower.'),
  createHotel('san-francisco-bay-hotel', 'San Francisco Bay Hotel', 'san-francisco', 250, 'hotel', hotelImage, 'Hotel junto a la bahía de San Francisco.'),
  createHotel('golden-gate-resort', 'Golden Gate Resort', 'san-francisco', 290, 'resort', resortImage, 'Resort cerca del Golden Gate.'),
  createHotel('cancun-beach-hotel', 'Cancun Beach Hotel', 'cancun', 240, 'hotel', hotelImage, 'Hotel de playa en Cancún.'),
  createHotel('caribbean-paradise-resort', 'Caribbean Paradise Resort', 'cancun', 300, 'resort', resortImage, 'Resort caribeño en Cancún.'),
  createHotel('chicago-downtown-hotel', 'Chicago Downtown Hotel', 'chicago', 210, 'hotel', hotelImage, 'Hotel en el centro de Chicago.'),
  createHotel('lake-michigan-resort', 'Lake Michigan Resort', 'chicago', 250, 'resort', resortImage, 'Resort junto al lago Michigan.'),

  // América del Sur
  createHotel('rio-beach-hotel', 'Rio Beach Hotel', 'rio-de-janeiro', 200, 'hotel', hotelImage, 'Hotel de playa en Rio de Janeiro.'),
  createHotel('copacabana-resort', 'Copacabana Resort', 'rio-de-janeiro', 250, 'resort', resortImage, 'Resort en Copacabana.'),
  createHotel('buenos-aires-central-hotel', 'Buenos Aires Central Hotel', 'buenos-aires', 150, 'hotel', hotelImage, 'Hotel céntrico en Buenos Aires.'),
  createHotel('tango-city-resort', 'Tango City Resort', 'buenos-aires', 180, 'resort', resortImage, 'Resort con ambiente porteño.'),
  createHotel('cusco-mountain-hotel', 'Cusco Mountain Hotel', 'cusco', 180, 'hotel', hotelImage, 'Hotel de montaña en Cusco.'),
  createHotel('inca-trail-resort', 'Inca Trail Resort', 'cusco', 220, 'resort', resortImage, 'Resort inspirado en el Camino Inca.'),
  createHotel('cartagena-colonial-hotel', 'Cartagena Colonial Hotel', 'cartagena', 170, 'hotel', hotelImage, 'Hotel colonial en Cartagena.'),
  createHotel('caribbean-sunset-resort', 'Caribbean Sunset Resort', 'cartagena', 210, 'resort', resortImage, 'Resort caribeño en Cartagena.'),
  createHotel('santiago-city-hotel', 'Santiago City Hotel', 'santiago-de-chile', 190, 'hotel', hotelImage, 'Hotel urbano en Santiago de Chile.'),
  createHotel('andes-view-resort', 'Andes View Resort', 'santiago-de-chile', 230, 'resort', resortImage, 'Resort con vistas a los Andes.'),
  createHotel('montevideo-coastal-hotel', 'Montevideo Coastal Hotel', 'montevideo', 160, 'hotel', hotelImage, 'Hotel costero en Montevideo.'),
  createHotel('rio-de-la-plata-resort', 'Rio de la Plata Resort', 'montevideo', 200, 'resort', resortImage, 'Resort junto al Río de la Plata.'),
];

// Helper functions
export function getContinentById(id: string): Continent | undefined {
  return continents.find((c) => c.id === id);
}

export function getCountriesByContinent(continentId: string): Country[] {
  return countries.filter((c) => c.continentId === continentId);
}

export function getCitiesByCountry(countryId: string): City[] {
  return cities.filter((c) => c.countryId === countryId);
}

export function getHotelsByCity(cityId: string): Hotel[] {
  return hotels.filter((h) => h.cityId === cityId);
}

export function getCountryById(id: string): Country | undefined {
  return countries.find((c) => c.id === id);
}

export function getCityById(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find((h) => h.id === id);
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

// Search function
export function searchHotels(query: string): Hotel[] {
  if (!query || query.trim() === '') {
    return hotels;
  }

  const normQuery = normalizeText(query);

  const matchingContinents = continents.filter((continent) =>
    normalizeText(continent.name).includes(normQuery),
  );
  const continentIds = matchingContinents.map((c) => c.id);

  const matchingCountries = countries.filter(
    (country) =>
      normalizeText(country.name).includes(normQuery) ||
      continentIds.includes(country.continentId),
  );
  const countryIds = matchingCountries.map((c) => c.id);

  const matchingCities = cities.filter(
    (city) =>
      normalizeText(city.name).includes(normQuery) ||
      countryIds.includes(city.countryId),
  );
  const cityIds = matchingCities.map((c) => c.id);
  const matchingHotels = hotels.filter(
    (hotel) =>
      normalizeText(hotel.name).includes(normQuery) ||
      normalizeText(hotel.description).includes(normQuery) ||
      cityIds.includes(hotel.cityId),
  );

  return matchingHotels;
}

const HOTEL_BOOKING_STORAGE_KEY = 'jmj-bookings';
const HOTEL_BOOKING_API_PATH = '/bookings';

function normalizeAccountEmail(email: string | undefined | null): string {
  return (email ?? '').trim().toLowerCase();
}

function canUseLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readBookingStore(): BookingRecord[] {
  if (!canUseLocalStorage()) return [];

  try {
    const storedValue = window.localStorage.getItem(HOTEL_BOOKING_STORAGE_KEY);
    return storedValue ? (JSON.parse(storedValue) as BookingRecord[]) : [];
  } catch {
    return [];
  }
}

function normalizeBooking(booking: BookingRecord): BookingRecord {
  return {
    ...booking,
    userEmail: normalizeAccountEmail(booking.userEmail),
    status: booking.status ?? 'active',
  };
}

function writeBookingStore(bookings: BookingRecord[]) {
  if (!canUseLocalStorage()) return;

  window.localStorage.setItem(HOTEL_BOOKING_STORAGE_KEY, JSON.stringify(bookings));

  void putRemoteStore(HOTEL_BOOKING_API_PATH, bookings);
}

export async function syncBookingStoreFromRemote(): Promise<void> {
  const remoteBookings = await fetchRemoteStore<BookingRecord[]>(HOTEL_BOOKING_API_PATH);

  if (!remoteBookings || remoteBookings.length === 0 || !canUseLocalStorage()) return;

  const normalizedRemoteBookings = remoteBookings.map((booking) => normalizeBooking(booking));

  window.localStorage.setItem(HOTEL_BOOKING_STORAGE_KEY, JSON.stringify(normalizedRemoteBookings));
}

export function getStoredBookings(): BookingRecord[] {
  const storedBookings = readBookingStore();
  const normalizedBookings = storedBookings.map((booking) => normalizeBooking(booking));

  normalizedBookings.sort((left, right) => {
    return right.bookingDate.localeCompare(left.bookingDate);
  });

  return normalizedBookings;
}

export function getStoredBookingsForUser(email: string | undefined | null): BookingRecord[] {
  const normalizedEmail = normalizeAccountEmail(email);
  const bookings = getStoredBookings();

  return bookings.filter((booking) => {
    if (!booking.userEmail) return true;
    return booking.userEmail === normalizedEmail;
  });
}

export function getStoredBookingById(id: string): BookingRecord | undefined {
  const booking = readBookingStore().find((item) => item.id === id);
  return booking ? normalizeBooking(booking) : undefined;
}

export function saveStoredBooking(booking: BookingRecord) {
  const bookings = readBookingStore();
  const filteredBookings = bookings.filter((item) => item.id !== booking.id);
  const nextBookings = [normalizeBooking(booking), ...filteredBookings];

  writeBookingStore(nextBookings);
}

export function cancelStoredBooking(bookingId: string): BookingRecord | undefined {
  const bookings = readBookingStore();
  const booking = bookings.find((item) => item.id === bookingId);

  if (!booking) return undefined;

  const canceledBooking: BookingRecord = {
    ...normalizeBooking(booking),
    status: 'canceled',
    canceledAt: new Date().toISOString(),
  };

  const nextBookings = bookings.map((item) => {
    if (item.id === bookingId) {
      return canceledBooking;
    }

    return item;
  });

  writeBookingStore(nextBookings);

  return canceledBooking;
}

export function isBookingCanceled(booking: BookingRecord): boolean {
  return (booking.status ?? 'active') === 'canceled';
}

export function isBookingPast(booking: BookingRecord): boolean {
  if ((booking.status ?? 'active') === 'canceled') return false;

  const checkOutDate = new Date(`${booking.checkOut}T00:00:00`);
  if (Number.isNaN(checkOutDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return checkOutDate.getTime() < today.getTime();
}

export function formatBookingDate(value: string, locale: string = 'es-ES'): string {
  if (!value) return '';

  const date = new Date(value.includes('T') ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatBookingDateTime(value: string, locale: string = 'es-ES'): string {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatStayRange(checkIn: string, checkOut: string, locale: string = 'es-ES'): string {
  const formattedCheckIn = formatBookingDate(checkIn, locale);
  const formattedCheckOut = formatBookingDate(checkOut, locale);

  return `${formattedCheckIn} - ${formattedCheckOut}`;
}
