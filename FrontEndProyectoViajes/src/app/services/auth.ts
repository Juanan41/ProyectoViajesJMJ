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
  balance?: number;
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
          tap((perfil) => {
            const userData: UserData = {
              id: String(perfil.id),
              name: perfil.username,
              email: perfil.email,
              balance: this.getStoredBalance(),
              reviews: [],
            };

            this.user.set(userData);
            this.credits.set(userData.balance ?? 5000);
            this.isLoggedIn.set(true);

            localStorage.setItem('user', JSON.stringify(userData));
          }),
          map(() => response),
          catchError(() => {
            const fallbackUser: UserData = {
              id: 'temp-user',
              name: response.email.split('@')[0],
              email: response.email,
              balance: this.getStoredBalance(),
              reviews: [],
            };

            this.user.set(fallbackUser);
            this.credits.set(fallbackUser.balance ?? 5000);
            this.isLoggedIn.set(true);

            localStorage.setItem('user', JSON.stringify(fallbackUser));

            return of(response);
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

  logout() {
    this.isLoggedIn.set(false);
    this.user.set(null);
    this.credits.set(5000);
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
    if (this.cards().length === 0) {
      alert(
        this.translationService.translate(
          'Necesitas tener una tarjeta añadida a tu cuenta para añadir o quitar dinero.',
        ),
      );
      return;
    }

    this.credits.update((prev) => Math.max(0, prev + amount));

    const current = this.user();
    if (current) {
      const updatedBalance = this.credits();
      this.updateUser({ balance: updatedBalance });
      localStorage.setItem('balance', String(updatedBalance));
    }
  }

  addCard(cardData: Omit<Card, 'id'>) {
    const newCard = {
      ...cardData,
      id: Math.random().toString(36).substring(2, 11),
    };

    this.cards.update((prev) => [...prev, newCard]);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
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
        this.credits.set(parsedUser.balance ?? 5000);
        this.isLoggedIn.set(true);
      } catch {
        this.logout();
      }
    }
  }

  private getStoredBalance(): number {
    const stored = localStorage.getItem('balance');
    return stored ? Number(stored) : 0;
  }
}
