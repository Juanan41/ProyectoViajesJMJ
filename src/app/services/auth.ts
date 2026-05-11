import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from '../data/destinations';
import { TranslationService } from './translation';
import { environment } from '../../environments/environment';
import { Observable, switchMap, tap, map, catchError, throwError, of } from 'rxjs';

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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type?: string;
  tipo?: string;
  email: string;
  role?: string;
  rol?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  role?: string;
  mensaje?: string;
}

export interface UsuarioPerfilResponse {
  id: number | string;
  username: string;
  email: string;
  role?: string;
}

export interface SaldoResponse {
  saldo: number;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private translationService = inject(TranslationService);
  private apiUrl = environment.apiUrl;

  isLoggedIn = signal(false);
  credits = signal(0);
  user = signal<UserData | null>(null);
  cards = signal<Card[]>([]);

  constructor() {
    this.restoreSession();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        const role = response.role ?? response.rol ?? 'USER';
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', role);
      }),
      switchMap((response) => {
        return this.getPerfil().pipe(
          switchMap((perfil) => {
            return this.obtenerSaldo().pipe(
              tap((saldoRes) => {
                const role = localStorage.getItem('role') || 'USER';
                const userData: UserData = {
                  id: String(perfil.id),
                  name: perfil.username,
                  email: perfil.email,
                  saldo: saldoRes.saldo,
                  rol: role,
                  reviews: [],
                };
                this.user.set(userData);
                this.credits.set(saldoRes.saldo);
                this.isLoggedIn.set(true);
                localStorage.setItem('user', JSON.stringify(userData));
              }),
              map(() => response),
              catchError(() => {
                const role = localStorage.getItem('role') || 'USER';
                const userData: UserData = {
                  id: String(perfil.id),
                  name: perfil.username,
                  email: perfil.email,
                  saldo: 0,
                  rol: role,
                  reviews: [],
                };
                this.user.set(userData);
                this.credits.set(0);
                this.isLoggedIn.set(true);
                localStorage.setItem('user', JSON.stringify(userData));
                return of(response);
              }),
            );
          }),
        );
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      }),
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, data);
  }

  getPerfil(): Observable<UsuarioPerfilResponse> {
    return this.http.get<UsuarioPerfilResponse>(`${this.apiUrl}/usuarios/me`, {
      headers: this.getAuthHeaders(),
    });
  }

  obtenerSaldo(): Observable<SaldoResponse> {
    return this.http.get<SaldoResponse>(`${this.apiUrl}/saldo`, {
      headers: this.getAuthHeaders(),
    });
  }

  recargarSaldo(cantidad: number): Observable<SaldoResponse> {
    return this.http.post<SaldoResponse>(
      `${this.apiUrl}/saldo/recargar`,
      { cantidad },
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  gastarSaldo(cantidad: number): Observable<SaldoResponse> {
    return this.http.post<SaldoResponse>(
      `${this.apiUrl}/saldo/gastar`,
      { cantidad },
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  logout() {
    this.isLoggedIn.set(false);
    this.user.set(null);
    this.credits.set(0);
    this.cards.set([]);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
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
      this.recargarSaldo(amount).subscribe({
        next: (res) => {
          this.credits.set(res.saldo);
          this.updateUser({ saldo: res.saldo });
        },
        error: (err) => console.error(err),
      });
    } else if (amount < 0) {
      this.gastarSaldo(Math.abs(amount)).subscribe({
        next: (res) => {
          this.credits.set(res.saldo);
          this.updateUser({ saldo: res.saldo });
        },
        error: (err) => console.error(err),
      });
    }
  }

  addCard(cardData: Omit<Card, 'id'>) {
    const newCard = {
      ...cardData,
      id: Math.random().toString(36).substring(2, 11),
    };
    this.cards.update((prev) => [...prev, newCard]);
  }

  removeCard(id: string) {
    this.cards.update((prev) => prev.filter((card) => card.id !== id));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  obtenerTarjetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cuentas/mis-cuentas`, {
      headers: this.getAuthHeaders(),
    });
  }

  agregarTarjeta(tarjeta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cuentas`, tarjeta, {
      headers: this.getAuthHeaders(),
    });
  }

  borrarTarjeta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cuentas/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  isCurrentUserAdmin(): boolean {
    const role = this.getRole();
    if (!role) return false;
    const normalizedRole = role.trim().toUpperCase();
    return normalizedRole === 'ADMIN' || normalizedRole === 'ROLE_ADMIN';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private restoreSession() {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        this.user.set(parsedUser);
        this.isLoggedIn.set(true);
        this.obtenerSaldo().subscribe({
          next: (res) => {
            this.credits.set(res.saldo);
            this.updateUser({ saldo: res.saldo });
          },
          error: () => {
            this.credits.set(parsedUser.saldo ?? 0);
          },
        });
      } catch {
        this.logout();
      }
    }
  }
}
