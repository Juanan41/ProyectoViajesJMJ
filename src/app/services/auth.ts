import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from '../data/destinations';
import { environment } from '../../environments/environment';
import { Observable, switchMap, tap, map, of } from 'rxjs';

export interface Card {
  id: string;
  last4: string;
  holder: string;
  expiry: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  saldo?: number;
  rol?: string;
  reviews?: Review[];
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  isLoggedIn = signal(false);
  credits = signal(0);
  user = signal<UserData | null>(null);

  constructor() {
    this.restoreSession();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        const role = response.role || response.rol || 'USER';
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', role);
      }),
      switchMap((response) => {
        return this.getPerfil().pipe(
          switchMap((perfil) => {
            return this.obtenerSaldo().pipe(
              tap((saldoRes) => {
                const role = localStorage.getItem('role') || perfil.role || 'USER';

                const userData: UserData = {
                  id: String(perfil.id),
                  name: perfil.username,
                  email: perfil.email,
                  avatarUrl: perfil.avatarUrl || '',
                  saldo: saldoRes.saldo,
                  rol: role,
                  reviews: [],
                };

                this.user.set(userData);
                this.credits.set(saldoRes.saldo);
                this.isLoggedIn.set(true);

                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('role', role);
              }),
              map(() => response),
            );
          }),
        );
      }),
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  getPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/me`, {
      headers: this.getAuthHeaders(),
    });
  }

  actualizarPerfil(data: {
    username: string;
    email: string;
    avatarUrl?: string;
  }): Observable<UserData> {
    return this.http
      .put<any>(`${this.apiUrl}/usuarios/me`, data, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((perfil) => {
          if (perfil.token) {
            localStorage.setItem('token', perfil.token);
          }

          const current = this.user();
          const role =
            perfil.role || perfil.rol || current?.rol || localStorage.getItem('role') || 'USER';
          const saldo = Number(perfil.saldo || current?.saldo || 0);

          const userData: UserData = {
            id: String(perfil.id),
            name: perfil.username,
            email: perfil.email,
            avatarUrl: perfil.avatarUrl || '',
            saldo,
            rol: role,
            reviews: current?.reviews || [],
          };

          this.user.set(userData);
          this.credits.set(saldo);

          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('role', role);

          return userData;
        }),
      );
  }

  obtenerSaldo(): Observable<any> {
    if (!this.getToken()) {
      return of({ saldo: 0 });
    }

    return this.http.get<any>(`${this.apiUrl}/saldo`, {
      headers: this.getAuthHeaders(),
    });
  }

  recargarSaldo(cantidad: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/saldo/recargar`,
      { cantidad },
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  gastarSaldo(cantidad: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/saldo/gastar`,
      { cantidad },
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  obtenerTarjetas(): Observable<any[]> {
    if (!this.getToken()) {
      return of([]);
    }

    return this.http
      .get<any[]>(`${this.apiUrl}/cuentas/me`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((cuentas) => {
          const list = Array.isArray(cuentas) ? cuentas : cuentas ? [cuentas] : [];

          return list.map((c) => ({
            id: c.id,
            numeroTarjeta: c.iban || c.numeroTarjeta || '',
            titular: c.titular || c.holder || '',
            fechaExpiracion: c.entidad ? c.entidad.replace('TARJETA ', '') : c.expiry || '12/25',
            last4: c.iban ? c.iban.slice(-4) : '0000',
            holder: c.titular || c.holder || '',
            expiry: c.entidad ? c.entidad.replace('TARJETA ', '') : c.expiry || '12/25',
          }));
        }),
      );
  }

  agregarTarjeta(tarjeta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cuentas`, tarjeta, {
      headers: this.getAuthHeaders(),
    });
  }

  borrarTarjeta(): Observable<any> {
    if (!this.getToken()) {
      this.credits.set(0);
      this.updateUser({ saldo: 0 });
      return of(null);
    }

    return this.http
      .delete(`${this.apiUrl}/cuentas/me`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap(() => {
          this.credits.set(0);
          this.updateUser({ saldo: 0 });
        }),
      );
  }

  logout() {
    this.isLoggedIn.set(false);
    this.user.set(null);
    this.credits.set(0);
    localStorage.clear();
  }

  updateUser(updates: Partial<UserData>) {
    const current = this.user();

    if (current) {
      const updated = { ...current, ...updates };
      this.user.set(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  }

  updateCredits(amount: number) {
    if (amount > 0) {
      this.recargarSaldo(amount).subscribe((res) => {
        this.credits.set(res.saldo);
        this.updateUser({ saldo: res.saldo });
      });
    } else if (amount < 0) {
      this.gastarSaldo(Math.abs(amount)).subscribe((res) => {
        this.credits.set(res.saldo);
        this.updateUser({ saldo: res.saldo });
      });
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isCurrentUserAdmin(): boolean {
    const role = localStorage.getItem('role') || this.user()?.rol;

    if (!role) return false;

    return role.trim().toUpperCase() === 'ADMIN' || role.trim().toUpperCase() === 'ROLE_ADMIN';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();

    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && this.isTokenExpired(token)) {
      this.logout();
      return;
    }

    if (token && storedUser) {
      try {
        this.user.set(JSON.parse(storedUser));
        this.isLoggedIn.set(true);

        this.obtenerSaldo().subscribe((res) => {
          this.credits.set(res.saldo);
          this.updateUser({ saldo: res.saldo });
        });
      } catch {
        this.logout();
      }
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (!payload.exp) return false;

      return payload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }
}
