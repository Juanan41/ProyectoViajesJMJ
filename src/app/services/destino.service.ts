import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DestinoDTO {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  continenteId: number;
  descripcion: string;
  imagenUrl: string;
  imagen: string;
  estrellas: number;
  precio: number;
  precioPorNoche: number;
}

@Injectable({
  providedIn: 'root',
})
export class DestinoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/destinos`;
  private serverUrl = environment.apiUrl.replace('/api', '');

  private fallbackImages = [
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020',
    'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1972',
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2076',
  ];

  private defaultBackendImage = 'photo-1436491865332-7a61a109cc05';

  private englishAliases: Record<string, string[]> = {
    paris: ['paris'],
    roma: ['rome'],
    londres: ['london'],
    atenas: ['athens'],
    viena: ['vienna'],
    praga: ['prague'],
    varsovia: ['warsaw'],
    estocolmo: ['stockholm'],
    copenhague: ['copenhagen'],
    pekin: ['beijing'],
    tokio: ['tokyo'],
    seul: ['seoul'],
    'nueva delhi': ['new delhi', 'delhi'],
    'el cairo': ['cairo'],
    marrakech: ['marrakesh'],
    'ciudad del cabo': ['cape town'],
    sidney: ['sydney'],
    fiyi: ['fiji'],
    'nueva york': ['new york'],
    'ciudad de mexico': ['mexico city'],
    'rio de janeiro': ['rio de janeiro'],
    'santiago de chile': ['santiago chile', 'santiago'],
  };

  private countryAliases: Record<string, string[]> = {
    alemania: ['germany'],
    argelia: ['algeria'],
    argentina: ['argentina'],
    aruba: ['aruba'],
    australia: ['australia'],
    austria: ['austria'],
    bahamas: ['bahamas'],
    belice: ['belize'],
    belgica: ['belgium'],
    bolivia: ['bolivia'],
    brasil: ['brazil'],
    canada: ['canada'],
    catar: ['qatar'],
    chile: ['chile'],
    china: ['china'],
    colombia: ['colombia'],
    'corea del sur': ['south korea', 'korea'],
    'costa rica': ['costa rica'],
    cuba: ['cuba'],
    curazao: ['curacao', 'curaçao'],
    ecuador: ['ecuador'],
    egipto: ['egypt'],
    'el salvador': ['el salvador'],
    'emiratos arabes unidos': ['united arab emirates', 'uae'],
    espana: ['spain'],
    'estados unidos': ['united states', 'usa', 'us'],
    etiopia: ['ethiopia'],
    filipinas: ['philippines'],
    fiyi: ['fiji'],
    francia: ['france'],
    ghana: ['ghana'],
    grecia: ['greece'],
    guam: ['guam'],
    guatemala: ['guatemala'],
    'guayana francesa': ['french guiana'],
    guyana: ['guyana'],
    honduras: ['honduras'],
    hungria: ['hungary'],
    india: ['india'],
    indonesia: ['indonesia'],
    'islas cook': ['cook islands'],
    'islas salomon': ['solomon islands'],
    israel: ['israel'],
    italia: ['italy'],
    jamaica: ['jamaica'],
    japon: ['japan'],
    kenia: ['kenya'],
    kiribati: ['kiribati'],
    malasia: ['malaysia'],
    marruecos: ['morocco'],
    mauricio: ['mauritius'],
    micronesia: ['micronesia'],
    mexico: ['mexico'],
    namibia: ['namibia'],
    nepal: ['nepal'],
    nicaragua: ['nicaragua'],
    nigeria: ['nigeria'],
    'nueva caledonia': ['new caledonia'],
    'nueva zelanda': ['new zealand'],
    palaos: ['palau'],
    panama: ['panama'],
    'papua nueva guinea': ['papua new guinea'],
    paraguay: ['paraguay'],
    'paises bajos': ['netherlands', 'holland'],
    peru: ['peru'],
    'polinesia francesa': ['french polynesia'],
    polonia: ['poland'],
    portugal: ['portugal'],
    'puerto rico': ['puerto rico'],
    'reino unido': ['united kingdom', 'uk', 'england'],
    'republica checa': ['czech republic', 'czechia'],
    'republica dominicana': ['dominican republic'],
    ruanda: ['rwanda'],
    samoa: ['samoa'],
    senegal: ['senegal'],
    seychelles: ['seychelles'],
    singapur: ['singapore'],
    sudafrica: ['south africa'],
    suecia: ['sweden'],
    suiza: ['switzerland'],
    surinam: ['suriname'],
    tailandia: ['thailand'],
    tanzania: ['tanzania'],
    tunez: ['tunisia'],
    tonga: ['tonga'],
    turquia: ['turkey'],
    uruguay: ['uruguay'],
    vanuatu: ['vanuatu'],
    venezuela: ['venezuela'],
    vietnam: ['vietnam'],
  };

  private continentAliases: Record<number, string[]> = {
    1: ['europe', 'europa'],
    2: ['asia'],
    3: ['africa', 'áfrica'],
    4: ['north america', 'america del norte', 'américa del norte'],
    5: ['south america', 'america del sur', 'américa del sur'],
    6: ['oceania', 'oceanía', 'australia pacific'],
  };

  public getFullImageUrl(imagePath: string): string {
    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800';
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${this.serverUrl}/${cleanPath}`;
  }

  private fixBrokenText(value: any): string {
    return String(value || '')
      .replaceAll('B?lgica', 'Bélgica')
      .replaceAll('Espa?a', 'España')
      .replaceAll('M?xico', 'México')
      .replaceAll('Per?', 'Perú')
      .replaceAll('Turqu?a', 'Turquía')
      .replaceAll('Sud?frica', 'Sudáfrica')
      .replaceAll('Pa?ses Bajos', 'Países Bajos')
      .replaceAll('Rep?blica Checa', 'República Checa')
      .replaceAll('Rep?blica Dominicana', 'República Dominicana')
      .replaceAll('Emiratos ?rabes Unidos', 'Emiratos Árabes Unidos')
      .replaceAll('Polinesia Francesa', 'Polinesia Francesa')
      .trim();
  }

  private normalizeText(value: string): string {
    return this.fixBrokenText(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private mapDestino(d: any): DestinoDTO {
    if (!d) return {} as DestinoDTO;

    const nombre = this.fixBrokenText(d.nombre);
    const ciudad = this.fixBrokenText(d.ciudad || d.nombre);
    const pais = this.fixBrokenText(d.pais);
    const descripcion = this.fixBrokenText(d.descripcion);

    let path = d.imagen || d.imagenUrl;
    const hasBackendDefault = path && path.includes(this.defaultBackendImage);

    if (!path || hasBackendDefault) {
      const index = Number(d.id || 0) % this.fallbackImages.length;
      path = this.fallbackImages[index];
    }

    let backendContinentId = d.continenteId;

    if (d.continente && typeof d.continente === 'object' && d.continente.id) {
      backendContinentId = d.continente.id;
    }

    if (!backendContinentId && d.continente) {
      backendContinentId = this.getContinentIdFromName(String(d.continente));
    }

    const continentFromCountry = this.getKnownContinentIdFromCountry(pais);

    const finalContinentId = continentFromCountry || Number(backendContinentId) || 1;
    const fullUrl = this.getFullImageUrl(path);

    return {
      ...d,
      nombre,
      ciudad: ciudad || nombre,
      pais,
      descripcion,
      continenteId: finalContinentId,
      imagen: fullUrl,
      imagenUrl: fullUrl,
    };
  }

  private getContinentIdFromName(value: string): number {
    const cont = this.normalizeText(value);

    if (cont.includes('europa')) return 1;
    if (cont.includes('asia')) return 2;
    if (cont.includes('africa')) return 3;
    if (cont.includes('america del norte')) return 4;
    if (cont.includes('america del sur')) return 5;
    if (cont.includes('oceania')) return 6;

    return 1;
  }

  private getKnownContinentIdFromCountry(value: string): number | null {
    const pais = this.normalizeText(value);

    const europe = [
      'alemania',
      'austria',
      'belgica',
      'espana',
      'francia',
      'grecia',
      'hungria',
      'italia',
      'paises bajos',
      'polonia',
      'portugal',
      'reino unido',
      'republica checa',
      'suecia',
      'suiza',
    ];

    const asia = [
      'catar',
      'china',
      'corea del sur',
      'emiratos arabes unidos',
      'filipinas',
      'india',
      'indonesia',
      'israel',
      'japon',
      'malasia',
      'nepal',
      'singapur',
      'tailandia',
      'turquia',
      'vietnam',
    ];

    const africa = [
      'argelia',
      'egipto',
      'etiopia',
      'ghana',
      'kenia',
      'marruecos',
      'mauricio',
      'namibia',
      'nigeria',
      'ruanda',
      'senegal',
      'seychelles',
      'sudafrica',
      'tanzania',
      'tunez',
    ];

    const northAmerica = [
      'bahamas',
      'belice',
      'canada',
      'costa rica',
      'cuba',
      'el salvador',
      'estados unidos',
      'guatemala',
      'honduras',
      'jamaica',
      'mexico',
      'nicaragua',
      'panama',
      'puerto rico',
      'republica dominicana',
    ];

    const southAmerica = [
      'argentina',
      'aruba',
      'bolivia',
      'brasil',
      'chile',
      'colombia',
      'curazao',
      'ecuador',
      'guayana francesa',
      'guyana',
      'paraguay',
      'peru',
      'surinam',
      'uruguay',
      'venezuela',
    ];

    const oceania = [
      'australia',
      'fiyi',
      'guam',
      'islas cook',
      'islas salomon',
      'kiribati',
      'micronesia',
      'nueva caledonia',
      'nueva zelanda',
      'palaos',
      'papua nueva guinea',
      'polinesia francesa',
      'samoa',
      'tonga',
      'vanuatu',
    ];

    if (europe.includes(pais)) return 1;
    if (asia.includes(pais)) return 2;
    if (africa.includes(pais)) return 3;
    if (northAmerica.includes(pais)) return 4;
    if (southAmerica.includes(pais)) return 5;
    if (oceania.includes(pais)) return 6;

    return null;
  }

  private getContinentIdFromCountry(value: string): number {
    return this.getKnownContinentIdFromCountry(value) || 1;
  }

  getDestinos(): Observable<DestinoDTO[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((destinos) => (destinos || []).map((d) => this.mapDestino(d))));
  }

  getDestinoById(id: number): Observable<DestinoDTO> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map((d) => (d ? this.mapDestino(d) : (null as any))));
  }

  getDestinosByPais(pais: string): Observable<DestinoDTO[]> {
    const query = this.normalizeText(pais);

    return this.getDestinos().pipe(
      map((destinos) =>
        (destinos || []).filter((d) => {
          const country = this.normalizeText(d.pais || '');
          const aliases = (this.countryAliases[country] || []).map((a) => this.normalizeText(a));

          return (
            country === query ||
            country.includes(query) ||
            query.includes(country) ||
            aliases.some(
              (alias) => alias === query || alias.includes(query) || query.includes(alias),
            )
          );
        }),
      ),
    );
  }

  getHotelDetails(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/alojamientos/${id}`).pipe(
      map((h) =>
        h
          ? {
              ...h,
              nombre: this.fixBrokenText(h.nombre || h.name),
              descripcion: this.fixBrokenText(h.descripcion),
              ciudad: this.fixBrokenText(h.ciudad),
              pais: this.fixBrokenText(h.pais),
              imagen: this.getFullImageUrl(h.imagen || h.imagenUrl),
              imagenUrl: this.getFullImageUrl(h.imagen || h.imagenUrl),
              image: this.getFullImageUrl(h.imagen || h.imagenUrl),
              name: this.fixBrokenText(h.nombre || h.name),
            }
          : (null as any),
      ),
    );
  }

  getAlojamientosByDestino(destinoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos/destino/${destinoId}`).pipe(
      map((alojamientos) =>
        (alojamientos || []).map((a) => ({
          ...a,
          nombre: this.fixBrokenText(a.nombre || a.name),
          descripcion: this.fixBrokenText(a.descripcion),
          ciudad: this.fixBrokenText(a.ciudad),
          pais: this.fixBrokenText(a.pais),
          imagen: this.getFullImageUrl(a.imagen || a.imagenUrl),
          imagenUrl: this.getFullImageUrl(a.imagen || a.imagenUrl),
          image: this.getFullImageUrl(a.imagen || a.imagenUrl),
          name: this.fixBrokenText(a.nombre || a.name),
        })),
      ),
    );
  }

  getAlojamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos`).pipe(
      map((alojamientos) =>
        (alojamientos || []).map((a) => ({
          ...a,
          nombre: this.fixBrokenText(a.nombre || a.name),
          descripcion: this.fixBrokenText(a.descripcion),
          ciudad: this.fixBrokenText(a.ciudad),
          pais: this.fixBrokenText(a.pais),
          imagen: this.getFullImageUrl(a.imagen || a.imagenUrl),
          imagenUrl: this.getFullImageUrl(a.imagen || a.imagenUrl),
          image: this.getFullImageUrl(a.imagen || a.imagenUrl),
          name: this.fixBrokenText(a.nombre || a.name),
        })),
      ),
    );
  }

  getHabitacionesByHotel(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos/${hotelId}/habitaciones`);
  }

  crearReserva(reserva: any): Observable<any> {
    const token = localStorage.getItem('token');
    const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    return this.http.post(`${environment.apiUrl}/reservas`, reserva, options);
  }

  searchDestinos(query: string): Observable<DestinoDTO[]> {
    const q = this.normalizeText(query);

    return this.getDestinos().pipe(
      map((destinos: DestinoDTO[]) => {
        if (!q) return destinos || [];

        return (destinos || []).filter((d) => {
          const nombre = this.normalizeText(d.nombre || '');
          const ciudad = this.normalizeText(d.ciudad || '');
          const pais = this.normalizeText(d.pais || '');
          const descripcion = this.normalizeText(d.descripcion || '');

          const aliases = [
            ...(this.englishAliases[nombre] || []),
            ...(this.countryAliases[pais] || []),
            ...(this.continentAliases[Number(d.continenteId)] || []),
          ];

          const searchableText = [
            nombre,
            ciudad,
            pais,
            descripcion,
            ...aliases.map((a) => this.normalizeText(a)),
          ].join(' ');

          return searchableText.includes(q);
        });
      }),
    );
  }
}
