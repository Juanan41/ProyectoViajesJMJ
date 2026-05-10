import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DestinoApi } from '../data/destino-api';

@Injectable({
  providedIn: 'root'
})
export class DestinosApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/destinos`;

  obtenerDestinos(): Observable<DestinoApi[]> {
    return this.http.get<DestinoApi[]>(this.apiUrl);
  }
}
