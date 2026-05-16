// ProyectoViajesJMJ - services\destinos-api.service.ts
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DestinoApi } from '../data/destino-api';

/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */
@Injectable({
  providedIn: 'root',
})
export class DestinosApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/destinos`;

  obtenerDestinos(): Observable<DestinoApi[]> {
    return this.http.get<DestinoApi[]>(this.apiUrl);
  }
}
