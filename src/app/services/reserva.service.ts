// ProyectoViajesJMJ - services\reserva.service.ts
// Responsabilidad: flujo de reservas, viajes y estados asociados.
// Nota profesional: Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Contrato publico usado por componentes y servicios relacionados.
 */
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
  transporteTipo: string;
  transporteNombre: string;
  transporteHora: string;
  transporteAsiento: string;
  transportePuerta: string;
}

/**
 * Documento profesional: clase principal del archivo.
 * Contiene reglas de reserva, estados de viaje y datos usados por tickets/recibos/perfil.
 */
@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Fuente principal de viajes para perfil y pantalla "Mis viajes".
  getMisReservas(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/reservas/mis-reservas`, {
      headers: this.getAuthHeaders(),
    });
  }

  getReservaPorId(id: number): Observable<ReservaResponse> {
    // El recibo siempre se solicita por id y protegido por token del usuario actual.
    return this.http.get<ReservaResponse>(`${this.apiUrl}/reservas/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  cancelarReserva(id: number): Observable<any> {
    // La cancelación se delega al backend para conservar auditoría y reglas de estado.
    return this.http.post(
      `${this.apiUrl}/reservas/${id}/cancelar`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }
}
