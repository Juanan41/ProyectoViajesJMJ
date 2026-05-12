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
    const path = d.imagen || d.imagenUrl;
    const fullUrl = this.getFullImageUrl(path);

    // BLINDAJE: Buscamos el ID del continente aunque venga escondido dentro de un objeto
    let contId = d.continenteId;
    if (d.continente && d.continente.id) {
      contId = d.continente.id;
    }

    return {
      ...d,
      continenteId: contId,
      imagen: fullUrl,
      imagenUrl: fullUrl,
    };
  }

  getDestinos(): Observable<DestinoDTO[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((destinos) => destinos.map((d) => this.mapDestino(d))));
  }

  getDestinoById(id: number): Observable<DestinoDTO> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map((d) => this.mapDestino(d)));
  }

  getDestinosByPais(pais: string): Observable<DestinoDTO[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/pais/${pais}`)
      .pipe(map((destinos) => destinos.map((d) => this.mapDestino(d))));
  }

  getHotelDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map((d) => this.mapDestino(d)));
  }

  getAlojamientosByDestino(destinoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos/destino/${destinoId}`).pipe(
      map((alojamientos) =>
        alojamientos.map((a) => ({
          ...a,
          imagen: this.getFullImageUrl(a.imagen || a.imagenUrl),
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
        destinos.filter(
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
