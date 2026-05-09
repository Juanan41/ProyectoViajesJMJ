import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DestinoDTO {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  pais: string;
  imagen: string;
  codigoIso: string;
  continenteId: number;
  continenteNombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class DestinoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getDestinos(): Observable<DestinoDTO[]> {
    return this.http.get<DestinoDTO[]>(`${this.apiUrl}/destinos`);
  }

  getDestinosByContinente(continenteId: number): Observable<DestinoDTO[]> {
    return this.http.get<DestinoDTO[]>(`${this.apiUrl}/destinos/continente/${continenteId}`);
  }

  getDestinoById(id: number): Observable<DestinoDTO> {
    return this.http.get<DestinoDTO>(`${this.apiUrl}/destinos/${id}`);
  }

  getDestinosByPais(pais: string): Observable<DestinoDTO[]> {
    return this.http.get<DestinoDTO[]>(`${this.apiUrl}/destinos/pais/${pais}`);
  }

  getHotelDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alojamientos/${id}`);
  }

  getAlojamientosByDestino(destinoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alojamientos/destino/${destinoId}`);
  }

  getHabitacionesByHotel(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/habitaciones/alojamiento/${hotelId}`);
  }

  crearReserva(reserva: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservas`, reserva);
  }

  getReservasUsuario(usuarioId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservas/usuario/${usuarioId}`);
  }

  getReservaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservas/${id}`);
  }
}
