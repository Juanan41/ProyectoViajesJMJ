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

  getDestinos(): Observable<DestinoDTO[]> {
    return this.http
      .get<DestinoDTO[]>(this.apiUrl)
      .pipe(map((destinos) => destinos.map((d) => ({ ...d, imagen: d.imagenUrl || d.imagen }))));
  }

  getDestinoById(id: number): Observable<DestinoDTO> {
    return this.http
      .get<DestinoDTO>(`${this.apiUrl}/${id}`)
      .pipe(map((d) => ({ ...d, imagen: d.imagenUrl || d.imagen })));
  }

  getDestinosByPais(pais: string): Observable<DestinoDTO[]> {
    return this.http
      .get<DestinoDTO[]>(`${this.apiUrl}/pais/${pais}`)
      .pipe(map((destinos) => destinos.map((d) => ({ ...d, imagen: d.imagenUrl || d.imagen }))));
  }

  getHotelDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAlojamientosByDestino(destinoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/alojamientos/destino/${destinoId}`);
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
            d.nombre?.toLowerCase().includes(q) ||
            d.ciudad?.toLowerCase().includes(q) ||
            d.pais?.toLowerCase().includes(q) ||
            d.descripcion?.toLowerCase().includes(q),
        ),
      ),
    );
  }
}
