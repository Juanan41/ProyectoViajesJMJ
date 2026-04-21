export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  hotelName?: string;
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

export const continents: Continent[] = [
  {
    id: 'europe',
    name: 'Europa',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
    description: 'Historia, cultura y arquitectura milenaria',
  },
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
    description: 'Tradición ancestral y modernidad vibrante',
  },
  {
    id: 'america',
    name: 'América',
    image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800',
    description: 'Naturaleza salvaje y ciudades cosmopolitas',
  },
  {
    id: 'africa',
    name: 'África',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    description: 'Safari, desiertos y culturas ancestrales',
  },
  {
    id: 'oceania',
    name: 'Oceanía',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    description: 'Playas paradisíacas y naturaleza única',
  },
];

export const countries: Country[] = [
  // Europa
  {
    id: 'france',
    name: 'Francia',
    continentId: 'europe',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  },
  {
    id: 'spain',
    name: 'España',
    continentId: 'europe',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800',
  },
  {
    id: 'italy',
    name: 'Italia',
    continentId: 'europe',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800',
  },
  {
    id: 'uk',
    name: 'Reino Unido',
    continentId: 'europe',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  },
  {
    id: 'germany',
    name: 'Alemania',
    continentId: 'europe',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
  },
  {
    id: 'switzerland',
    name: 'Suiza',
    continentId: 'europe',
    flag: '🇨🇭',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
  },

  // Asia
  {
    id: 'japan',
    name: 'Japón',
    continentId: 'asia',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
  },
  {
    id: 'thailand',
    name: 'Tailandia',
    continentId: 'asia',
    flag: '🇹🇭',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
  },
  {
    id: 'uae',
    name: 'Emiratos Árabes',
    continentId: 'asia',
    flag: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  },
  {
    id: 'singapore',
    name: 'Singapur',
    continentId: 'asia',
    flag: '🇸🇬',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
  },
  {
    id: 'india',
    name: 'India',
    continentId: 'asia',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  },

  // América
  {
    id: 'usa',
    name: 'Estados Unidos',
    continentId: 'america',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
  },
  {
    id: 'brazil',
    name: 'Brasil',
    continentId: 'america',
    flag: '🇧🇷',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
  },
  {
    id: 'argentina',
    name: 'Argentina',
    continentId: 'america',
    flag: '🇦🇷',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
  },
  {
    id: 'mexico',
    name: 'México',
    continentId: 'america',
    flag: '🇲🇽',
    image: 'https://images.unsplash.com/photo-1518659664331-862e3a95a63b?w=800',
  },
  {
    id: 'canada',
    name: 'Canadá',
    continentId: 'america',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800',
  },

  // África
  {
    id: 'morocco',
    name: 'Marruecos',
    continentId: 'africa',
    flag: '🇲🇦',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
  },
  {
    id: 'egypt',
    name: 'Egipto',
    continentId: 'africa',
    flag: '🇪🇬',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800',
  },
  {
    id: 'southafrica',
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
    id: 'newzealand',
    name: 'Nueva Zelanda',
    continentId: 'oceania',
    flag: '🇳🇿',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800',
  },
];

export const cities: City[] = [
  // Francia
  {
    id: 'paris',
    name: 'París',
    countryId: 'france',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800',
    description: 'La ciudad de la luz, arte y romance',
  },
  {
    id: 'nice',
    name: 'Niza',
    countryId: 'france',
    image: 'https://images.unsplash.com/photo-1536300007881-21e4f1ed0b6c?w=800',
    description: 'Perla de la Costa Azul',
  },
  {
    id: 'lyon',
    name: 'Lyon',
    countryId: 'france',
    image: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?w=800',
    description: 'Capital gastronómica de Francia',
  },

  // España
  {
    id: 'madrid',
    name: 'Madrid',
    countryId: 'spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
    description: 'Vibrante capital española',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    countryId: 'spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    description: 'Modernismo y mediterráneo',
  },
  {
    id: 'seville',
    name: 'Sevilla',
    countryId: 'spain',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800',
    description: 'Flamenco y tradición andaluza',
  },

  // Italia
  {
    id: 'rome',
    name: 'Roma',
    countryId: 'italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    description: 'La ciudad eterna',
  },
  {
    id: 'venice',
    name: 'Venecia',
    countryId: 'italy',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800',
    description: 'Ciudad de canales y romance',
  },
  {
    id: 'milan',
    name: 'Milán',
    countryId: 'italy',
    image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800',
    description: 'Capital de la moda',
  },

  // Reino Unido
  {
    id: 'london',
    name: 'Londres',
    countryId: 'uk',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    description: 'Cosmopolita y histórica',
  },
  {
    id: 'edinburgh',
    name: 'Edimburgo',
    countryId: 'uk',
    image: 'https://images.unsplash.com/photo-1580669446032-3e6d747e05b1?w=800',
    description: 'Castillos y leyendas escocesas',
  },

  // Alemania
  {
    id: 'berlin',
    name: 'Berlín',
    countryId: 'germany',
    image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=800',
    description: 'Historia y cultura vanguardista',
  },
  {
    id: 'munich',
    name: 'Múnich',
    countryId: 'germany',
    image: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800',
    description: 'Tradición bávara',
  },

  // Suiza
  {
    id: 'zurich',
    name: 'Zúrich',
    countryId: 'switzerland',
    image: 'https://images.unsplash.com/photo-1521292270410-a8c4d716d518?w=800',
    description: 'Alpes suizos y elegancia',
  },
  {
    id: 'geneva',
    name: 'Ginebra',
    countryId: 'switzerland',
    image: 'https://images.unsplash.com/photo-1581359593257-29b5cbbf5b88?w=800',
    description: 'Lujo y diplomacia internacional',
  },

  // Japón
  {
    id: 'tokyo',
    name: 'Tokio',
    countryId: 'japan',
    image: 'https://images.unsplash.com/photo-1641558996066-fcf78962c30a?w=800',
    description: 'Tecnología y tradición',
  },
  {
    id: 'kyoto',
    name: 'Kioto',
    countryId: 'japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    description: 'Templos y jardines zen',
  },
  {
    id: 'osaka',
    name: 'Osaka',
    countryId: 'japan',
    image: 'https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e?w=800',
    description: 'Gastronomía japonesa',
  },

  // Tailandia
  {
    id: 'bangkok',
    name: 'Bangkok',
    countryId: 'thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    description: 'Templos dorados y mercados',
  },
  {
    id: 'phuket',
    name: 'Phuket',
    countryId: 'thailand',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
    description: 'Playas paradisíacas',
  },

  // EAU
  {
    id: 'dubai',
    name: 'Dubái',
    countryId: 'uae',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Lujo y arquitectura futurista',
  },
  {
    id: 'abudhabi',
    name: 'Abu Dhabi',
    countryId: 'uae',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800',
    description: 'Modernidad árabe',
  },

  // Singapur
  {
    id: 'singapore',
    name: 'Singapur',
    countryId: 'singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    description: 'Jardín urbano del futuro',
  },

  // India
  {
    id: 'mumbai',
    name: 'Mumbai',
    countryId: 'india',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
    description: 'Bollywood y diversidad',
  },
  {
    id: 'newdelhi',
    name: 'Nueva Delhi',
    countryId: 'india',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    description: 'Historia milenaria',
  },

  // USA
  {
    id: 'newyork',
    name: 'Nueva York',
    countryId: 'usa',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'La ciudad que nunca duerme',
  },
  {
    id: 'losangeles',
    name: 'Los Ángeles',
    countryId: 'usa',
    image: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=800',
    description: 'Hollywood y playas',
  },
  {
    id: 'miami',
    name: 'Miami',
    countryId: 'usa',
    image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800',
    description: 'Sol, playa y vida nocturna',
  },

  // Brasil
  {
    id: 'riodejaneiro',
    name: 'Río de Janeiro',
    countryId: 'brazil',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    description: 'Carnaval y playas icónicas',
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    countryId: 'brazil',
    image: 'https://images.unsplash.com/photo-1578954928-9c501c9e0c8f?w=800',
    description: 'Metrópoli cultural',
  },

  // Argentina
  {
    id: 'buenosaires',
    name: 'Buenos Aires',
    countryId: 'argentina',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
    description: 'Tango y arquitectura europea',
  },

  // Méjico
  {
    id: 'mexicocity',
    name: 'Ciudad de México',
    countryId: 'mexico',
    image: 'https://images.unsplash.com/photo-1518659664331-862e3a95a63b?w=800',
    description: 'Historia azteca y modernidad',
  },
  {
    id: 'cancun',
    name: 'Cancún',
    countryId: 'mexico',
    image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800',
    description: 'Playas del Caribe mexicano',
  },

  // Canadá
  {
    id: 'toronto',
    name: 'Toronto',
    countryId: 'canada',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
    description: 'Multicultural y vibrante',
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    countryId: 'canada',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800',
    description: 'Naturaleza y ciudad',
  },

  // Marruecos
  {
    id: 'marrakech',
    name: 'Marrakech',
    countryId: 'morocco',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800',
    description: 'Zocos y palacios',
  },
  {
    id: 'casablanca',
    name: 'Casablanca',
    countryId: 'morocco',
    image: 'https://images.unsplash.com/photo-1565602726015-10c095699bb6?w=800',
    description: 'Puerto mediterráneo',
  },

  // Egipto
  {
    id: 'cairo',
    name: 'El Cairo',
    countryId: 'egypt',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800',
    description: 'Pirámides y faraones',
  },

  // Sudáfrica
  {
    id: 'capetown',
    name: 'Ciudad del Cabo',
    countryId: 'southafrica',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    description: 'Montañas y océano',
  },

  // Australia
  {
    id: 'sydney',
    name: 'Sídney',
    countryId: 'australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    description: 'Ópera icónica y playas',
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    countryId: 'australia',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800',
    description: 'Arte y café',
  },

  // Nueva Zelanda
  {
    id: 'auckland',
    name: 'Auckland',
    countryId: 'newzealand',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800',
    description: 'Ciudad de velas',
  },
];

export const hotels: Hotel[] = [
  // París
  {
    id: 'paris-1',
    name: 'Hotel Le Meurice',
    rating: 5,
    pricePerNight: 850,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Maria Lopez',
        rating: 5,
        comment: 'Increíble experiencia, todo perfecto.',
        date: '2023-11-20',
      },
      {
        id: 'r2',
        userName: 'John Doe',
        rating: 4.8,
        comment: 'Las vistas son maravillosas. Un poco caro, pero vale la pena.',
        date: '2023-10-15',
      },
    ],
    description:
      'Un hotel palacio que combina la opulencia del siglo XVIII con el confort moderno, ofreciendo vistas inigualables a los Jardines de las Tullerías y la Torre Eiffel.',
    amenities: [
      'Wifi de alta velocidad',
      'Desayuno incluido',
      'Aire acondicionado',
      'Spa & Wellness',
      'Restaurante Estrella Michelin',
    ],
    cityId: 'paris',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
  },
  {
    id: 'paris-2',
    name: 'Hôtel Plaza Athénée',
    rating: 5,
    pricePerNight: 920,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    description:
      'Elegancia parisina en la Avenue Montaigne, con vistas a la Torre Eiffel y alta cocina francesa.',
    amenities: ['Spa Dior', 'Piscina interior', 'Restaurante gourmet', 'Servicio de mayordomo'],
    cityId: 'paris',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r3t480q',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rki5zec',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'paris-3',
    name: 'Hotel Fabric',
    rating: 4,
    pricePerNight: 220,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    description: 'Boutique hotel moderno en el distrito 11, perfecto para viajeros urbanos.',
    amenities: ['Wifi gratuito', 'Bar de cócteles', 'Diseño contemporáneo'],
    cityId: 'paris',
    category: 'boutique',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: false,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'r9pq9ym',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rbzuhmm',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Niza
  {
    id: 'nice-1',
    name: 'Hotel Negresco',
    rating: 5,
    pricePerNight: 480,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    additionalPhotos: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
    reviews: [
      {
        id: 'r3',
        userName: 'Aline Dupont',
        rating: 5,
        comment: 'Magnifique! Muy elegante y la comida es espectacular.',
        date: '2023-08-12',
      },
    ],
    description:
      'Icónico hotel Belle Époque en la Promenade des Anglais con vistas al Mediterráneo.',
    amenities: ['Playa privada', 'Restaurante 2 estrellas Michelin', 'Colección de arte'],
    cityId: 'nice',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
  },
  {
    id: 'nice-2',
    name: 'Le Méridien Nice',
    rating: 4,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'Hotel moderno en el corazón de Niza, cerca de la playa y el casco antiguo.',
    amenities: ['Terraza panorámica', 'Restaurante mediterráneo', 'Bar lounge'],
    cityId: 'nice',
    category: 'boutique',
    hasPool: false,
    hasGym: true,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'r2ugmu',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rkh4ez',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Lyon
  {
    id: 'lyon-1',
    name: 'Villa Florentine',
    rating: 5,
    pricePerNight: 320,
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
    description: 'Antiguo convento convertido en hotel de lujo con vistas espectaculares de Lyon.',
    amenities: ['Spa', 'Piscina al aire libre', 'Restaurante gastronómico'],
    cityId: 'lyon',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r1ekcre',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rfr2tid',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'lyon-2',
    name: 'Hôtel Le Royal Lyon',
    rating: 5,
    pricePerNight: 290,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Elegancia y confort en el centro histórico de Lyon.',
    amenities: ['Bar sofisticado', 'Salones elegantes', 'Conserje 24/7'],
    cityId: 'lyon',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rlukyx',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r3edim',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Madrid
  {
    id: 'madrid-1',
    name: 'Hotel Ritz Madrid',
    rating: 5,
    pricePerNight: 650,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    additionalPhotos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
    ],
    reviews: [
      {
        id: 'r4',
        userName: 'Carlos Ruiz',
        rating: 4.5,
        comment: 'Excelente atención y localización inmejorable.',
        date: '2023-09-05',
      },
      {
        id: 'r5',
        userName: 'Ana Belen',
        rating: 5,
        comment: 'Simplemente perfecto.',
        date: '2023-10-01',
      },
    ],
    description: 'Lujo histórico en el corazón de Madrid, cerca del Museo del Prado.',
    amenities: ['Jardín privado', 'Spa', 'Restaurante estrella Michelin'],
    cityId: 'madrid',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
  },
  {
    id: 'madrid-2',
    name: 'Gran Meliá Palacio de los Duques',
    rating: 5,
    pricePerNight: 380,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    description: 'Palacio del siglo XIX restaurado con elegancia contemporánea.',
    amenities: ['Piscina en la azotea', 'Spa', 'Bar gourmet'],
    cityId: 'madrid',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r91uclc',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'ru93awn',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'madrid-3',
    name: 'Room Mate Oscar',
    rating: 4,
    pricePerNight: 140,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    description: 'Hotel moderno y colorido en pleno centro de Madrid.',
    amenities: ['Terraza con vistas', 'Bar', 'Diseño vanguardista'],
    cityId: 'madrid',
    category: 'boutique',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: false,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'rouyc3k',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r9ble4r',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Barcelona
  {
    id: 'barcelona-1',
    name: 'Mandarin Oriental Barcelona',
    rating: 5,
    pricePerNight: 620,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    description: 'Sofisticación en Paseo de Gracia, con vistas a Gaudí.',
    amenities: ['Piscina en azotea', 'Spa', 'Restaurante Moments 2 estrellas Michelin'],
    cityId: 'barcelona',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'ri4abff',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rc8xudq',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'barcelona-2',
    name: 'Hotel Arts Barcelona',
    rating: 5,
    pricePerNight: 480,
    image: 'https://images.unsplash.com/photo-1561501878-aabd62634533?w=800',
    description: 'Rascacielos icónico frente al mar con arte contemporáneo.',
    amenities: ['Playa privada', 'Spa', 'Piscina infinity'],
    cityId: 'barcelona',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r5abubr',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r752omt',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'barcelona-3',
    name: 'Hotel Praktik Bakery',
    rating: 3,
    pricePerNight: 110,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'Hotel boutique con panadería artesanal propia.',
    amenities: ['Panadería gourmet', 'Wifi gratis', 'Ubicación céntrica'],
    cityId: 'barcelona',
    category: 'budget',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: false,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'rn1o92',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rmyodim',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Sevilla
  {
    id: 'seville-1',
    name: 'Hotel Alfonso XIII',
    rating: 5,
    pricePerNight: 420,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    description: 'Palacio andalusí con patios ajardinados y azulejos tradicionales.',
    amenities: ['Piscina', 'Jardines', 'Arquitectura morisca'],
    cityId: 'seville',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rhwptsq',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rvyynzr',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'seville-2',
    name: 'EME Catedral Hotel',
    rating: 4,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800',
    description: 'Vistas directas a la Catedral desde la terraza.',
    amenities: ['Terraza panorámica', 'Bar cocktail', 'Ubicación privilegiada'],
    cityId: 'seville',
    category: 'boutique',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'rv4of4e',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r5paem',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Roma
  {
    id: 'rome-1',
    name: 'Hotel Eden Rome',
    rating: 5,
    pricePerNight: 750,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Vistas panorámicas de Roma desde el Pincio.',
    amenities: ['Restaurante La Terrazza', 'Spa', 'Bar panorámico'],
    cityId: 'rome',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rxtjbsp',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rr4mdtd',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'rome-2',
    name: 'The St. Regis Rome',
    rating: 5,
    pricePerNight: 680,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description: 'Elegancia intemporal cerca de Via Veneto.',
    amenities: ['Mayordomo personal', 'Restaurante gourmet', 'Salones históricos'],
    cityId: 'rome',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'ry4cix9',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r0g951h',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Venecia
  {
    id: 'venice-1',
    name: 'The Gritti Palace',
    rating: 5,
    pricePerNight: 890,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'Palacio del siglo XV en el Gran Canal con vistas excepcionales.',
    amenities: ['Terraza privada', 'Spa', 'Restaurante Club del Doge'],
    cityId: 'venice',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'rax456j',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r2wje8',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'venice-2',
    name: 'Hotel Danieli',
    rating: 5,
    pricePerNight: 720,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    description: 'Palacio gótico con vistas a la laguna veneciana.',
    amenities: ['Terraza panorámica', 'Bar histórico', 'Decoración veneciana'],
    cityId: 'venice',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'r2izigl',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rt14lbn',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Milán
  {
    id: 'milan-1',
    name: 'Armani Hotel Milano',
    rating: 5,
    pricePerNight: 580,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    description: 'Diseño minimalista de Giorgio Armani en el corazón de Milán.',
    amenities: ['Spa Armani', 'Restaurante italiano', 'Estilo único'],
    cityId: 'milan',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'ra0gcch',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rcbd7kg',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'milan-2',
    name: 'Bulgari Hotel Milano',
    rating: 5,
    pricePerNight: 820,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    description: 'Lujo exclusivo con jardín privado en el centro de Milán.',
    amenities: ['Jardín de 4000m²', 'Spa Bulgari', 'Piscina interior'],
    cityId: 'milan',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rs4zy4d',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r9ikge',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Londres
  {
    id: 'london-1',
    name: 'The Savoy',
    rating: 5,
    pricePerNight: 720,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Icono londinense en el Strand con historia centenaria.',
    amenities: ['American Bar', 'Spa', 'Piscina art déco'],
    cityId: 'london',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rcgng7e',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r0ra2nw',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'london-2',
    name: "Claridge's",
    rating: 5,
    pricePerNight: 850,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    description: 'Art déco y elegancia británica en Mayfair.',
    amenities: ['Afternoon tea legendario', 'Spa', 'Restaurante Davies and Brook'],
    cityId: 'london',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rbij3k',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rr3qpu',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'london-3',
    name: 'The Hoxton Shoreditch',
    rating: 4,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800',
    description: 'Hotel urbano moderno en el vibrante East London.',
    amenities: ['Bar lounge', 'Diseño industrial', 'Lobby café'],
    cityId: 'london',
    category: 'boutique',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'rg2e46',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rmppbert',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Tokio
  {
    id: 'tokyo-1',
    name: 'Aman Tokyo',
    rating: 5,
    pricePerNight: 980,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    description:
      'Un santuario urbano en lo alto de la torre Otemachi Tower, ofreciendo un diseño minimalista inspirado en las casas japonesas tradicionales.',
    amenities: [
      'Piscina panorámica',
      'Spa tradicional japonés',
      'Servicio de conserje 24/7',
      'Gimnasio',
      'Restaurante exclusivo',
    ],
    cityId: 'tokyo',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rlqxnx',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rf47abb',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'tokyo-2',
    name: 'The Peninsula Tokyo',
    rating: 5,
    pricePerNight: 720,
    image: 'https://images.unsplash.com/photo-1561501878-aabd62634533?w=800',
    description: 'Lujo contemporáneo con vistas al Palacio Imperial.',
    amenities: ['Spa', 'Piscina', 'Restaurantes japoneses y franceses'],
    cityId: 'tokyo',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'ruvje1k',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rmzuk2c',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'tokyo-3',
    name: 'Shinjuku Granbell Hotel',
    rating: 4,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    description: 'Hotel moderno en Kabukicho con diseño artístico.',
    amenities: ['Bar en azotea', 'Arte urbano', 'Ubicación central'],
    cityId: 'tokyo',
    category: 'boutique',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: false,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'remq659',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r9b7tjr',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Kioto
  {
    id: 'kyoto-1',
    name: 'The Ritz-Carlton Kyoto',
    rating: 5,
    pricePerNight: 680,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    description: 'A orillas del río Kamogawa, fusionando tradición y lujo moderno.',
    amenities: ['Spa japonés', 'Jardín zen', 'Restaurante kaiseki'],
    cityId: 'kyoto',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rkka5ff',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r2paz3l',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'kyoto-2',
    name: 'Suiran, a Luxury Collection Hotel',
    rating: 5,
    pricePerNight: 550,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    description: 'Refugio tradicional en Arashiyama con onsen privado.',
    amenities: ['Onsen', 'Jardines tradicionales', 'Ceremonia del té'],
    cityId: 'kyoto',
    category: 'luxury',
    hasPool: false,
    hasGym: false,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'ru2dqct',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rfrq45h',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Osaka
  {
    id: 'osaka-1',
    name: 'The St. Regis Osaka',
    rating: 5,
    pricePerNight: 480,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description: 'Elegancia occidental en el centro comercial de Osaka.',
    amenities: ['Mayordomo', 'Spa Iridium', 'Restaurante francés'],
    cityId: 'osaka',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r3b53z',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rrqpfvd',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Zúrich
  {
    id: 'zurich-1',
    name: 'The Dolder Grand',
    rating: 5,
    pricePerNight: 620,
    image: 'https://images.unsplash.com/photo-1521292270410-a8c4d716d518?w=800',
    description:
      'Un resort de lujo histórico que ofrece impresionantes vistas de Zúrich, el lago y los Alpes, con una impresionante colección de arte.',
    amenities: [
      'Spa de 4000m²',
      'Campo de golf',
      'Vistas a la montaña',
      'Piscina cubierta',
      'Alta cocina',
    ],
    cityId: 'zurich',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rzzcf1',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r14mqy5',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'zurich-2',
    name: 'Baur au Lac',
    rating: 5,
    pricePerNight: 780,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Hotel familiar de lujo con jardín privado junto al lago.',
    amenities: ['Jardín privado', 'Restaurante gourmet', 'Servicio personalizado'],
    cityId: 'zurich',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rxji7vn',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r4lekum',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Dubái
  {
    id: 'dubai-1',
    name: 'Burj Al Arab',
    rating: 5,
    pricePerNight: 1850,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    description: 'El hotel más icónico del mundo en forma de vela.',
    amenities: ['Mayordomo personal', 'Helipuerto', 'Restaurantes submarinos'],
    cityId: 'dubai',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r3o6cgfh',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rd1udbe',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'dubai-2',
    name: 'Atlantis The Palm',
    rating: 5,
    pricePerNight: 580,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Resort temático con parque acuático y acuario.',
    amenities: ['Parque acuático', 'Acuario', 'Playa privada'],
    cityId: 'dubai',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rew6xr5',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rzpc7e',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'dubai-3',
    name: 'Rove Downtown Dubai',
    rating: 3,
    pricePerNight: 120,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800',
    description: 'Hotel moderno y asequible cerca del Burj Khalifa.',
    amenities: ['The Daily restaurant', 'Piscina', 'Gym 24/7'],
    cityId: 'dubai',
    category: 'budget',
    hasPool: true,
    hasGym: true,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r2a1417',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'ro53yep',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Nueva York
  {
    id: 'newyork-1',
    name: 'The Plaza Hotel',
    rating: 5,
    pricePerNight: 950,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    description: 'Icono histórico de Nueva York frente a Central Park.',
    amenities: ['The Palm Court', 'Spa Guerlain', 'Servicio legendario'],
    cityId: 'newyork',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rg7sssg',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r5fkbvz',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'newyork-2',
    name: 'The St. Regis New York',
    rating: 5,
    pricePerNight: 880,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description: 'Elegancia Beaux-Arts en la Quinta Avenida.',
    amenities: ['Mayordomo', 'King Cole Bar', 'Ubicación privilegiada'],
    cityId: 'newyork',
    category: 'luxury',
    hasPool: false,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'r7gc2g',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r4p0dxe',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'newyork-3',
    name: 'The Bowery Hotel',
    rating: 4,
    pricePerNight: 340,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    description: 'Boutique hotel bohemio en el Lower East Side.',
    amenities: ['Bar lounge', 'Chimenea', 'Estilo vintage'],
    cityId: 'newyork',
    category: 'boutique',
    hasPool: false,
    hasGym: false,
    hasSpa: false,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: false,
    reviews: [
      {
        id: 'rzdk03i',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rsaqlb8',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },

  // Sídney
  {
    id: 'sydney-1',
    name: 'Park Hyatt Sydney',
    rating: 5,
    pricePerNight: 680,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    description: 'Vistas incomparables de la Ópera y el Harbour Bridge.',
    amenities: ['Ubicación frente al puerto', 'Spa', 'Restaurante The Dining Room'],
    cityId: 'sydney',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rcf32n',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'r9uc8w',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'sydney-2',
    name: 'Four Seasons Hotel Sydney',
    rating: 5,
    pricePerNight: 580,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'Lujo contemporáneo en The Rocks con vistas panorámicas.',
    amenities: ['Piscina infinity', 'Mode Kitchen & Bar', 'Spa'],
    cityId: 'sydney',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [
      {
        id: 'rfs8daw',
        userName: 'Paco García',
        rating: 4.5,
        comment: 'Excelente ubicación y muy buena atención. Totalmente recomendado.',
        date: '2023-12-01',
      },
      {
        id: 'rqy4r7s',
        userName: 'Aventurero Global',
        rating: 5,
        comment: 'Una experiencia inolvidable. Las instalaciones son de primera. Volveré sin duda.',
        date: '2024-01-15',
      },
    ],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: 'edinburgh-1',
    name: 'The Balmoral',
    rating: 5,
    pricePerNight: 500,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'A luxury hotel in the heart of Edinburgh.',
    amenities: ['Pool', 'Spa', 'Restaurant'],
    cityId: 'edinburgh',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'berlin-1',
    name: 'Hotel Adlon Kempinski',
    rating: 5,
    pricePerNight: 450,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    description: 'Iconic luxury hotel in Berlin near the Brandenburg Gate.',
    amenities: ['Gym', 'Spa', 'Restaurant'],
    cityId: 'berlin',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'munich-1',
    name: 'Bayerischer Hof',
    rating: 5,
    pricePerNight: 400,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Luxury combined with Bavarian tradition.',
    amenities: ['Spa', 'Restaurant', 'Wifi'],
    cityId: 'munich',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'geneva-1',
    name: 'Four Seasons Hotel des Bergues',
    rating: 5,
    pricePerNight: 600,
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d2847?w=800',
    description: 'Lakeside elegance in Geneva.',
    amenities: ['Spa', 'Dining', 'Pool'],
    cityId: 'geneva',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'bangkok-1',
    name: 'Mandarin Oriental, Bangkok',
    rating: 5,
    pricePerNight: 350,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    description: 'Legendary hotel by the river.',
    amenities: ['Pool', 'Spa', 'Gym'],
    cityId: 'bangkok',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'phuket-1',
    name: 'Amanpuri',
    rating: 5,
    pricePerNight: 800,
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800',
    description: 'A peaceful paradise in Phuket.',
    amenities: ['Private Beach', 'Spa', 'Dining'],
    cityId: 'phuket',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'abudhabi-1',
    name: 'Emirates Palace',
    rating: 5,
    pricePerNight: 700,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    description: 'Palatial luxury in Abu Dhabi.',
    amenities: ['Private Beach', 'Spa', 'Dining'],
    cityId: 'abudhabi',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'singapore-1',
    name: 'Marina Bay Sands',
    rating: 5,
    pricePerNight: 550,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'Iconic hotel with the world’s largest rooftop Infinity Pool.',
    amenities: ['Infinity Pool', 'Casino', 'Dining'],
    cityId: 'singapore',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'mumbai-1',
    name: 'The Taj Mahal Palace',
    rating: 5,
    pricePerNight: 300,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    description: 'A legendary luxury hotel in Mumbai.',
    amenities: ['Spa', 'Pool', 'Dining'],
    cityId: 'mumbai',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
  {
    id: 'newdelhi-1',
    name: 'The Leela Palace',
    rating: 5,
    pricePerNight: 250,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Modern Indian luxury in the capital.',
    amenities: ['Spa', 'Dining', 'Pool'],
    cityId: 'newdelhi',
    category: 'luxury',
    hasPool: true,
    hasGym: true,
    hasSpa: true,
    hasRestaurant: true,
    hasWifi: true,
    hasParking: true,
    reviews: [],
  },
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
  const matchingCountries = countries.filter((country) =>
    normalizeText(country.name).includes(normQuery),
  );
  const countryIds = matchingCountries.map((c) => c.id);

  const matchingCities = cities.filter(
    (city) => normalizeText(city.name).includes(normQuery) || countryIds.includes(city.countryId),
  );
  const cityIds = matchingCities.map((c) => c.id);

  const matchingHotels = hotels.filter(
    (hotel) => normalizeText(hotel.name).includes(normQuery) || cityIds.includes(hotel.cityId),
  );

  return matchingHotels;
}
