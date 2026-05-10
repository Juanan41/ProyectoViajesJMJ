import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ReservaResponse {
  id: number;
  destinoId: number;
  alojamientoId: number;
  habitacionId: number;
  destinoNombre: string;
  alojamientoNombre: string;
  imagenUrl: string;
  fechaReserva: string;
  checkIn: string;
  checkOut: string;
  noches: number;
  huespedes: number;
  precioTotal: number;
  estado: string;
  transporteTipo?: string;
  transporteNombre?: string;
  transporteHora?: string;
  transporteAsiento?: string;
  transportePuerta?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getMisReservas(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/reservas/mis-reservas`, {
      headers: this.getAuthHeaders(),
    });
  }

  getReservaPorId(id: number): Observable<ReservaResponse> {
    return this.http.get<ReservaResponse>(`${this.apiUrl}/reservas/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  cancelarReserva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservas/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
