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
    madrid: ['madrid', 'spain'],
    paris: ['paris', 'france'],
    roma: ['rome', 'italy'],
    londres: ['london', 'united kingdom', 'uk', 'england'],
    atenas: ['athens', 'greece'],
    viena: ['vienna', 'austria'],

    tokio: ['tokyo', 'japan'],
    bangkok: ['bangkok', 'thailand'],
    pekin: ['beijing', 'china'],
    dubai: ['dubai', 'united arab emirates', 'uae'],
    'nueva delhi': ['new delhi', 'delhi', 'india'],
    seul: ['seoul', 'south korea', 'korea'],

    'el cairo': ['cairo', 'egypt'],
    marrakech: ['marrakesh', 'morocco'],
    nairobi: ['nairobi', 'kenya'],
    zanzibar: ['zanzibar', 'tanzania'],
    sahara: ['sahara', 'desert', 'morocco'],
    'ciudad del cabo': ['cape town', 'south africa'],

    sidney: ['sydney', 'australia'],
    melbourne: ['melbourne', 'australia'],
    auckland: ['auckland', 'new zealand'],
    fiyi: ['fiji'],
    'bora bora': ['bora bora', 'french polynesia'],
    perth: ['perth', 'australia'],

    'nueva york': ['new york', 'usa', 'united states', 'america'],
    'ciudad de mexico': ['mexico city', 'mexico'],
    toronto: ['toronto', 'canada'],
    'san francisco': ['san francisco', 'usa', 'united states'],
    cancun: ['cancun', 'mexico'],
    chicago: ['chicago', 'usa', 'united states'],

    'rio de janeiro': ['rio de janeiro', 'brazil'],
    'buenos aires': ['buenos aires', 'argentina'],
    'machu picchu': ['machu picchu', 'peru'],
    cartagena: ['cartagena', 'colombia'],
    'santiago de chile': ['santiago', 'santiago chile', 'chile'],
    montevideo: ['montevideo', 'uruguay'],
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

  private normalizeText(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private mapDestino(d: any): DestinoDTO {
    if (!d) return {} as DestinoDTO;

    let path = d.imagen || d.imagenUrl;
    const nameForImage = (d.ciudad || d.nombre || d.pais || '').toString().trim();
    const hasBackendDefault = path && path.includes(this.defaultBackendImage);

    if (!path || hasBackendDefault) {
      if (nameForImage) {
        path = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600';
      } else {
        const index = (d.id || 0) % this.fallbackImages.length;
        path = this.fallbackImages[index];
      }
    }

    const fullUrl = this.getFullImageUrl(path);

    let contId = d.continenteId;
    if (d.continente && d.continente.id) contId = d.continente.id;

    if (!contId && d.continente) {
      const cont = d.continente.toString().toLowerCase();

      if (cont.includes('europa')) contId = 1;
      else if (cont.includes('asia')) contId = 2;
      else if (cont.includes('áfrica') || cont.includes('africa')) contId = 3;
      else if (cont.includes('américa del norte') || cont.includes('america del norte')) contId = 5;
      else if (cont.includes('américa del sur') || cont.includes('america del sur')) contId = 6;
      else if (cont.includes('oceanía') || cont.includes('oceania')) contId = 4;
    }

    if (!contId) {
      const pais = this.normalizeText(d.pais || '');

      if (
        ['espana', 'francia', 'italia', 'alemania', 'reino unido', 'grecia', 'austria'].includes(
          pais,
        )
      )
        contId = 1;
      else if (
        [
          'japon',
          'china',
          'india',
          'tailandia',
          'emiratos arabes unidos',
          'corea del sur',
        ].includes(pais)
      )
        contId = 2;
      else if (['egipto', 'marruecos', 'kenia', 'sudafrica', 'tanzania'].includes(pais)) contId = 3;
      else if (['australia', 'nueva zelanda', 'fiyi', 'polinesia francesa'].includes(pais))
        contId = 4;
      else if (['estados unidos', 'mexico', 'canada'].includes(pais)) contId = 5;
      else if (['brasil', 'argentina', 'colombia', 'chile', 'peru', 'uruguay'].includes(pais))
        contId = 6;
      else contId = 1;
    }

    return {
      ...d,
      ciudad: d.ciudad || d.nombre,
      continenteId: Number(contId),
      imagen: fullUrl,
      imagenUrl: fullUrl,
    };
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
    return this.http
      .get<any[]>(`${this.apiUrl}/pais/${encodeURIComponent(pais)}`)
      .pipe(map((destinos) => (destinos || []).map((d) => this.mapDestino(d))));
  }

  getHotelDetails(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/alojamientos/${id}`).pipe(
      map((h) =>
        h
          ? {
              ...h,
              nombre: h.nombre || h.name,
              imagen: this.getFullImageUrl(h.imagen || h.imagenUrl),
              imagenUrl: this.getFullImageUrl(h.imagen || h.imagenUrl),
              image: this.getFullImageUrl(h.imagen || h.imagenUrl),
              name: h.nombre || h.name,
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
          imagen: this.getFullImageUrl(a.imagen || a.imagenUrl),
          imagenUrl: this.getFullImageUrl(a.imagen || a.imagenUrl),
          image: this.getFullImageUrl(a.imagen || a.imagenUrl),
          name: a.nombre,
        })),
      ),
    );
  }

  getAlojamientos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos`).pipe(
      map((alojamientos) =>
        (alojamientos || []).map((a) => ({
          ...a,
          imagen: this.getFullImageUrl(a.imagen || a.imagenUrl),
          imagenUrl: this.getFullImageUrl(a.imagen || a.imagenUrl),
          image: this.getFullImageUrl(a.imagen || a.imagenUrl),
          name: a.nombre,
        })),
      ),
    );
  }

  getHabitacionesByHotel(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos/${hotelId}/habitaciones`);
  }

  crearReserva(reserva: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reservas`, reserva, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
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
          const aliases = this.englishAliases[nombre] || [];

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
