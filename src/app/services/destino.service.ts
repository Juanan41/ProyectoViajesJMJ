import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DestinoDTO {
  id?: number;
  nombre: string;
  ciudad: string;
  pais: string;
  continenteId?: number;
  descripcion?: string;
  imagenUrl?: string;
  imagen?: string;
  estrellas?: number;
  precio?: number;
  precioPorNoche?: number;
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

  public getFullImageUrl(imagePath?: string): string {
    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800';
    }
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${this.serverUrl}/${cleanPath}`;
  }

  private mapDestino(d: any): DestinoDTO {
    if (!d) return {} as DestinoDTO;

    let path = d.imagen || d.imagenUrl;
    const nameForImage = (d.ciudad || d.nombre || d.pais || '').toString().trim();
    const hasBackendDefault = path && path.includes(this.defaultBackendImage);

    if (!path || hasBackendDefault) {
      if (nameForImage) {
        path = `https://source.unsplash.com/1600x900/?${encodeURIComponent(nameForImage)}`;
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
      else if (cont.includes('américa del norte')) contId = 4;
      else if (cont.includes('américa del sur')) contId = 5;
      else if (cont.includes('oceanía') || cont.includes('oceania')) contId = 6;
    }

    if (!contId) {
      const pais = (d.pais || '').toLowerCase();
      if (['españa', 'francia', 'italia', 'alemania', 'reino unido'].includes(pais)) contId = 1;
      else if (['japón', 'china', 'india', 'tailandia'].includes(pais)) contId = 2;
      else if (['egipto', 'marruecos', 'kenia', 'sudáfrica'].includes(pais)) contId = 3;
      else if (['estados unidos', 'méxico', 'canadá'].includes(pais)) contId = 4;
      else if (['brasil', 'argentina', 'colombia', 'chile', 'perú'].includes(pais)) contId = 5;
      else if (['australia', 'nueva zelanda'].includes(pais)) contId = 6;
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
    const q = query.toLowerCase().trim();
    return this.getDestinos().pipe(
      map((destinos: DestinoDTO[]) =>
        (destinos || []).filter(
          (d) =>
            (d.nombre && d.nombre.toLowerCase().includes(q)) ||
            (d.ciudad && d.ciudad.toLowerCase().includes(q)) ||
            (d.pais && d.pais.toLowerCase().includes(q)) ||
            (d.descripcion && d.descripcion.toLowerCase().includes(q)),
        ),
      ),
    );
  }
}
