// ProyectoViajesJMJ - data\destination-coordinates.ts
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

/**
 * Contrato publico usado por componentes y servicios relacionados.
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const MADRID_COORDINATES: Coordinates = {
  latitude: 40.4168,
  longitude: -3.7038,
};

export const DESTINATION_COORDINATES: Record<string, Coordinates> = {
  // España
  madrid: { latitude: 40.4168, longitude: -3.7038 },
  barcelona: { latitude: 41.3874, longitude: 2.1686 },
  sevilla: { latitude: 37.3891, longitude: -5.9845 },
  valencia: { latitude: 39.4699, longitude: -0.3763 },
  granada: { latitude: 37.1773, longitude: -3.5986 },
  bilbao: { latitude: 43.263, longitude: -2.935 },

  // Francia
  paris: { latitude: 48.8566, longitude: 2.3522 },
  lyon: { latitude: 45.764, longitude: 4.8357 },
  niza: { latitude: 43.7102, longitude: 7.262 },
  marsella: { latitude: 43.2965, longitude: 5.3698 },
  burdeos: { latitude: 44.8378, longitude: -0.5792 },

  // Italia
  roma: { latitude: 41.9028, longitude: 12.4964 },
  venecia: { latitude: 45.4408, longitude: 12.3155 },
  milan: { latitude: 45.4642, longitude: 9.19 },
  florencia: { latitude: 43.7696, longitude: 11.2558 },
  napoles: { latitude: 40.8518, longitude: 14.2681 },

  // Reino Unido
  londres: { latitude: 51.5072, longitude: -0.1276 },
  edimburgo: { latitude: 55.9533, longitude: -3.1883 },
  manchester: { latitude: 53.4808, longitude: -2.2426 },
  liverpool: { latitude: 53.4084, longitude: -2.9916 },

  // Alemania
  berlin: { latitude: 52.52, longitude: 13.405 },
  munich: { latitude: 48.1351, longitude: 11.582 },
  hamburgo: { latitude: 53.5511, longitude: 9.9937 },
  colonia: { latitude: 50.9375, longitude: 6.9603 },

  // Grecia
  atenas: { latitude: 37.9838, longitude: 23.7275 },
  santorini: { latitude: 36.3932, longitude: 25.4615 },
  mykonos: { latitude: 37.4467, longitude: 25.3289 },
  tesalonica: { latitude: 40.6401, longitude: 22.9444 },

  // Austria
  viena: { latitude: 48.2082, longitude: 16.3738 },
  salzburgo: { latitude: 47.8095, longitude: 13.055 },
  innsbruck: { latitude: 47.2692, longitude: 11.4041 },
  graz: { latitude: 47.0707, longitude: 15.4395 },

  // Países Bajos
  amsterdam: { latitude: 52.3676, longitude: 4.9041 },
  rotterdam: { latitude: 51.9244, longitude: 4.4777 },
  'la haya': { latitude: 52.0705, longitude: 4.3007 },
  utrecht: { latitude: 52.0907, longitude: 5.1214 },

  // Suiza
  zurich: { latitude: 47.3769, longitude: 8.5417 },
  ginebra: { latitude: 46.2044, longitude: 6.1432 },
  lucerna: { latitude: 47.0502, longitude: 8.3093 },
  interlaken: { latitude: 46.6863, longitude: 7.8632 },

  // Portugal
  lisboa: { latitude: 38.7223, longitude: -9.1393 },
  oporto: { latitude: 41.1579, longitude: -8.6291 },
  faro: { latitude: 37.0194, longitude: -7.9304 },
  sintra: { latitude: 38.8029, longitude: -9.3817 },

  // Bélgica
  bruselas: { latitude: 50.8503, longitude: 4.3517 },
  brujas: { latitude: 51.2093, longitude: 3.2247 },
  amberes: { latitude: 51.2194, longitude: 4.4025 },
  gante: { latitude: 51.0543, longitude: 3.7174 },

  // República Checa
  praga: { latitude: 50.0755, longitude: 14.4378 },
  'cesky krumlov': { latitude: 48.8127, longitude: 14.3175 },
  'karlovy vary': { latitude: 50.2319, longitude: 12.8719 },
  brno: { latitude: 49.1951, longitude: 16.6068 },

  // Croacia
  dubrovnik: { latitude: 42.6507, longitude: 18.0944 },
  split: { latitude: 43.5081, longitude: 16.4402 },
  zagreb: { latitude: 45.815, longitude: 15.9819 },
  hvar: { latitude: 43.1729, longitude: 16.4423 },

  // Asia
  tokio: { latitude: 35.6762, longitude: 139.6503 },
  kioto: { latitude: 35.0116, longitude: 135.7681 },
  osaka: { latitude: 34.6937, longitude: 135.5023 },
  bangkok: { latitude: 13.7563, longitude: 100.5018 },
  phuket: { latitude: 7.8804, longitude: 98.3923 },
  dubai: { latitude: 25.2048, longitude: 55.2708 },
  'abu dhabi': { latitude: 24.4539, longitude: 54.3773 },
  'nueva delhi': { latitude: 28.6139, longitude: 77.209 },
  mumbai: { latitude: 19.076, longitude: 72.8777 },
  pekin: { latitude: 39.9042, longitude: 116.4074 },
  shanghai: { latitude: 31.2304, longitude: 121.4737 },
  seul: { latitude: 37.5665, longitude: 126.978 },
  singapore: { latitude: 1.3521, longitude: 103.8198 },
  bali: { latitude: -8.3405, longitude: 115.092 },
  maldivas: { latitude: 3.2028, longitude: 73.2207 },

  // América
  'nueva york': { latitude: 40.7128, longitude: -74.006 },
  'los angeles': { latitude: 34.0522, longitude: -118.2437 },
  miami: { latitude: 25.7617, longitude: -80.1918 },
  'san francisco': { latitude: 37.7749, longitude: -122.4194 },
  chicago: { latitude: 41.8781, longitude: -87.6298 },
  toronto: { latitude: 43.6532, longitude: -79.3832 },
  vancouver: { latitude: 49.2827, longitude: -123.1207 },
  cancun: { latitude: 21.1619, longitude: -86.8515 },
  'ciudad de mexico': { latitude: 19.4326, longitude: -99.1332 },
  'rio de janeiro': { latitude: -22.9068, longitude: -43.1729 },
  'sao paulo': { latitude: -23.5558, longitude: -46.6396 },
  'buenos aires': { latitude: -34.6037, longitude: -58.3816 },
  'machu picchu': { latitude: -13.1631, longitude: -72.545 },
  cartagena: { latitude: 10.391, longitude: -75.4794 },
  'santiago de chile': { latitude: -33.4489, longitude: -70.6693 },
  montevideo: { latitude: -34.9011, longitude: -56.1645 },
  lima: { latitude: -12.0464, longitude: -77.0428 },
  cusco: { latitude: -13.5319, longitude: -71.9675 },
  bogota: { latitude: 4.711, longitude: -74.0721 },

  // África
  'el cairo': { latitude: 30.0444, longitude: 31.2357 },
  luxor: { latitude: 25.6872, longitude: 32.6396 },
  marrakech: { latitude: 31.6295, longitude: -7.9811 },
  fez: { latitude: 34.0181, longitude: -5.0078 },
  casablanca: { latitude: 33.5731, longitude: -7.5898 },
  'ciudad del cabo': { latitude: -33.9249, longitude: 18.4241 },
  johannesburg: { latitude: -26.2041, longitude: 28.0473 },
  nairobi: { latitude: -1.2921, longitude: 36.8219 },
  zanzibar: { latitude: -6.1659, longitude: 39.2026 },
  sahara: { latitude: 23.4162, longitude: 25.6628 },
  serengeti: { latitude: -2.3333, longitude: 34.8333 },
  kilimanjaro: { latitude: -3.0674, longitude: 37.3556 },

  // Oceanía
  sidney: { latitude: -33.8688, longitude: 151.2093 },
  sydney: { latitude: -33.8688, longitude: 151.2093 },
  melbourne: { latitude: -37.8136, longitude: 144.9631 },
  auckland: { latitude: -36.8509, longitude: 174.7645 },
  'bora bora': { latitude: -16.5004, longitude: -151.7415 },
  perth: { latitude: -31.9523, longitude: 115.8613 },
  brisbane: { latitude: -27.4698, longitude: 153.0251 },
  queenstown: { latitude: -45.0312, longitude: 168.6626 },
  wellington: { latitude: -41.2865, longitude: 174.7762 },
  nadi: { latitude: -17.7765, longitude: 177.4356 },
};

export function toDestinationCoordinateKey(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getDestinationCoordinates(
  destination: string | null | undefined,
): Coordinates | null {
  if (!destination) {
    return null;
  }

  const candidates = [
    destination,
    destination.split(',')[0],
    destination.split('-')[0],
    destination.split('(')[0],
  ];

  for (const candidate of candidates) {
    const key = toDestinationCoordinateKey(candidate);

    if (DESTINATION_COORDINATES[key]) {
      return DESTINATION_COORDINATES[key];
    }
  }

  return null;
}

export function calculateDistanceKm(origin: Coordinates, destination: Coordinates): number {
  const earthRadiusKm = 6371;

  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);
  const latitudeDifference = toRadians(destination.latitude - origin.latitude);
  const longitudeDifference = toRadians(destination.longitude - origin.longitude);

  const haversine =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return Math.round(earthRadiusKm * centralAngle);
}

export function getDistanceFromMadridKm(destination: string | null | undefined): number {
  const coordinates = getDestinationCoordinates(destination);

  if (!coordinates) {
    return 0;
  }

  return calculateDistanceKm(MADRID_COORDINATES, coordinates);
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}
