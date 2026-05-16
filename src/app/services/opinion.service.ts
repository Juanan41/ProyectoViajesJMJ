// ProyectoViajesJMJ - services\opinion.service.ts
// Responsabilidad: resenas de alojamientos y valoracion de experiencias.
// Nota profesional: Gestiona resenas y valoraciones asociadas a alojamientos y usuarios autenticados.

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Contrato publico usado por componentes y servicios relacionados.
 */
export interface OpinionDTO {
  id: number;
  alojamientoId: number;
  alojamientoNombre: string;
  usuarioId: number;
  nombreUsuario: string;
  destinoNombre: string;
  puntuacion: number;
  comentario: string;
  fechaOpinion: string;
}

/**
 * Contrato publico usado por componentes y servicios relacionados.
 */
export interface CreateOpinionDTO {
  puntuacion: number;
  comentario: string;
}

/**
 * Documento profesional: clase principal del archivo.
 * Gestiona resenas y valoraciones asociadas a alojamientos y usuarios autenticados.
 */
@Injectable({
  providedIn: 'root',
})
export class OpinionService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getOpinionesByAlojamiento(alojamientoId: number): Observable<OpinionDTO[]> {
    return this.http.get<OpinionDTO[]>(`${this.apiUrl}/opiniones/alojamiento/${alojamientoId}`);
  }

  getMisOpiniones(): Observable<OpinionDTO[]> {
    return this.http.get<OpinionDTO[]>(`${this.apiUrl}/opiniones/mis`, {
      headers: this.getAuthHeaders(),
    });
  }

  addOpinion(alojamientoId: number, opinion: CreateOpinionDTO): Observable<OpinionDTO> {
    return this.http.post<OpinionDTO>(
      `${this.apiUrl}/opiniones/alojamiento/${alojamientoId}`,
      opinion,
      { headers: this.getAuthHeaders() },
    );
  }

  deleteOpinion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/opiniones/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateOpinion(id: number, opinion: CreateOpinionDTO): Observable<OpinionDTO> {
    return this.http.put<OpinionDTO>(`${this.apiUrl}/opiniones/${id}`, opinion, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }
}
