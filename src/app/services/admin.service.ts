import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminUsuario {
  id: number;
  username: string;
  email: string;
  role: string;
  saldo: number;
  avatarUrl?: string;
  fechaRegistro?: string;
}

export interface AdminDestino {
  id: number;
  nombre: string;
  pais: string;
  continente?: string;
  continenteNombre?: string;
  continenteId?: number;
  descripcion?: string;
  imagen?: string;
  imagenUrl?: string;
  precioDesde?: number;
  rating?: number;
}

export interface ReservaAdminResponse {
  id: number;

  usuarioId?: number;
  usuarioUsername: string;
  usuarioEmail: string;

  destinoId?: number;
  destinoNombre: string;

  alojamientoId?: number;
  alojamientoNombre: string;

  habitacionId?: number;

  fechaReserva?: string;
  fechaInicio?: string;
  fechaFin?: string;
  checkIn?: string;
  checkOut?: string;

  noches?: number;
  huespedes?: number;
  precioTotal: number;
  estado: string;

  transporteTipo?: string;
  transporteNombre?: string;
  transporteHora?: string;
  transporteAsiento?: string;
  transportePuerta?: string;
}

export interface AdminHotelDTO {
  id: number;
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
  imagen?: string;
  tipo: string;
  estrellas?: number;
  rating?: number;

  destinoId: number;
  destinoNombre: string;
  ciudad: string;
  pais: string;

  precioPorNoche: number;
  precioDesde?: number;
  reservas?: number;
}

export interface AdminUserCardDTO {
  titular?: string;
  iban?: string;
  swiftBic?: string;
  swift_bic?: string;
  entidad?: string;
  activa?: boolean;
  last4?: string;
}

export interface AdminOpinionDTO {
  id: number;
  alojamientoId?: number;
  alojamientoNombre?: string;
  destinoNombre?: string;
  puntuacion?: number;
  comentario?: string;
  fechaOpinion?: string;
}

export interface AdminUserSummaryDTO {
  viajesActivos: number;
  viajesPendientes: number;
  viajesCancelados: number;
  viajesRealizados: number;
  destinosUnicos: number;
  kmRecorridos: number;
  saldo: number;
  totalGastado: number;
  totalReservas: number;
  totalOpiniones: number;
  totalResenias: number;
}

export interface AdminUserDetailDTO {
  id: number;
  username: string;
  email: string;
  role: string;
  saldo: number;
  avatarUrl?: string;

  usuario: AdminUsuario;
  tarjeta: AdminUserCardDTO | null;
  resumen: AdminUserSummaryDTO;

  reservasPendientes: ReservaAdminResponse[];
  reservasRealizadas: ReservaAdminResponse[];
  reservasCanceladas: ReservaAdminResponse[];
  opiniones: AdminOpinionDTO[];
}

export type AdminUsuarioDetalle = AdminUserDetailDTO;
export type AdminHotel = AdminHotelDTO;
export type AdminReserva = ReservaAdminResponse;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getUsuarios(): Observable<AdminUsuario[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/admin/usuarios`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map((usuarios) => (usuarios || []).map((usuario) => this.normalizeUsuario(usuario))));
  }

  getDestinos(): Observable<AdminDestino[]> {
    return this.http.get<AdminDestino[]>(`${this.apiUrl}/admin/destinos`, {
      headers: this.getAuthHeaders(),
    });
  }

  getReservas(): Observable<ReservaAdminResponse[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/admin/reservas`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map((reservas) => (reservas || []).map((reserva) => this.normalizeReserva(reserva))));
  }

  getHoteles(): Observable<AdminHotelDTO[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/admin/hoteles`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map((hoteles) => (hoteles || []).map((hotel) => this.normalizeHotel(hotel))));
  }

  getUsuarioDetalle(id: number): Observable<AdminUserDetailDTO> {
    return this.http
      .get<any>(`${this.apiUrl}/admin/usuarios/${id}/detalle`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map((detail) => this.normalizeUserDetail(detail)));
  }

  updateUsuario(id: number, dto: any): Observable<AdminUsuario> {
    return this.http.put<AdminUsuario>(`${this.apiUrl}/admin/usuarios/${id}`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/usuarios/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createDestino(dto: any): Observable<AdminDestino> {
    return this.http.post<AdminDestino>(`${this.apiUrl}/admin/destinos`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  updateDestino(id: number, dto: any): Observable<AdminDestino> {
    return this.http.put<AdminDestino>(`${this.apiUrl}/admin/destinos/${id}`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteDestino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/destinos/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createHotel(dto: any): Observable<AdminHotelDTO> {
    return this.http.post<AdminHotelDTO>(`${this.apiUrl}/admin/hoteles`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  updateHotel(id: number, dto: any): Observable<AdminHotelDTO> {
    return this.http.put<AdminHotelDTO>(`${this.apiUrl}/admin/hoteles/${id}`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/hoteles/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  private normalizeUsuario(usuario: any): AdminUsuario {
    return {
      id: Number(usuario?.id || 0),
      username: usuario?.username || usuario?.name || usuario?.nombre || 'Usuario',
      email: usuario?.email || '',
      role: usuario?.role || usuario?.rol || 'USER',
      saldo: Number(usuario?.saldo || 0),
      avatarUrl: usuario?.avatarUrl || '',
      fechaRegistro: usuario?.fechaRegistro || usuario?.createdAt || '',
    };
  }

  private normalizeReserva(reserva: any): ReservaAdminResponse {
    return {
      id: Number(reserva?.id || 0),

      usuarioId: reserva?.usuarioId,
      usuarioUsername:
        reserva?.usuarioUsername ||
        reserva?.usuarioNombre ||
        reserva?.username ||
        reserva?.nombreUsuario ||
        reserva?.usuario?.username ||
        reserva?.usuario?.name ||
        'Usuario',
      usuarioEmail: reserva?.usuarioEmail || reserva?.emailUsuario || reserva?.usuario?.email || '',

      destinoId: reserva?.destinoId,
      destinoNombre:
        reserva?.destinoNombre || reserva?.destino || reserva?.destino?.nombre || 'Destino',

      alojamientoId: reserva?.alojamientoId,
      alojamientoNombre:
        reserva?.alojamientoNombre ||
        reserva?.hotelNombre ||
        reserva?.alojamiento ||
        reserva?.habitacion?.alojamiento?.nombre ||
        'Alojamiento',

      habitacionId: reserva?.habitacionId,

      fechaReserva: reserva?.fechaReserva || '',
      fechaInicio: reserva?.fechaInicio || reserva?.checkIn || '',
      fechaFin: reserva?.fechaFin || reserva?.checkOut || '',
      checkIn: reserva?.checkIn || reserva?.fechaInicio || '',
      checkOut: reserva?.checkOut || reserva?.fechaFin || '',

      noches: Number(reserva?.noches || 0),
      huespedes: Number(reserva?.huespedes || 1),
      precioTotal: Number(reserva?.precioTotal || reserva?.importe || 0),
      estado: reserva?.estado || 'CONFIRMADA',

      transporteTipo: reserva?.transporteTipo || reserva?.transporte || '',
      transporteNombre: reserva?.transporteNombre || '',
      transporteHora: reserva?.transporteHora || '',
      transporteAsiento: reserva?.transporteAsiento || '',
      transportePuerta: reserva?.transportePuerta || '',
    };
  }

  private normalizeHotel(hotel: any): AdminHotelDTO {
    const destino = hotel?.destino || {};

    return {
      id: Number(hotel?.id || 0),
      nombre: hotel?.nombre || 'Hotel',
      descripcion: hotel?.descripcion || '',
      imagenUrl: hotel?.imagenUrl || hotel?.imagen || '',
      imagen: hotel?.imagen || hotel?.imagenUrl || '',
      tipo: hotel?.tipo || 'HOTEL',
      estrellas: Number(hotel?.estrellas || hotel?.rating || 4),
      rating: Number(hotel?.rating || hotel?.estrellas || 4),

      destinoId: Number(hotel?.destinoId || destino?.id || 0),
      destinoNombre: hotel?.destinoNombre || destino?.nombre || hotel?.ciudad || 'Destino',
      ciudad: hotel?.ciudad || destino?.nombre || hotel?.destinoNombre || '',
      pais: hotel?.pais || destino?.pais || '',

      precioPorNoche: Number(hotel?.precioPorNoche || hotel?.precioDesde || hotel?.precio || 0),
      precioDesde: Number(hotel?.precioDesde || hotel?.precioPorNoche || hotel?.precio || 0),
      reservas: Number(hotel?.reservas || hotel?.totalReservas || 0),
    };
  }

  private normalizeUserDetail(detail: any): AdminUserDetailDTO {
    const usuarioRaw = detail?.usuario || detail?.user || detail || {};
    const usuario = this.normalizeUsuario(usuarioRaw);

    const reservasPendientesRaw =
      detail?.reservasPendientes ||
      detail?.viajesPendientes ||
      detail?.reservasActivas ||
      detail?.viajesActivos ||
      [];

    const reservasRealizadasRaw =
      detail?.reservasRealizadas ||
      detail?.viajesRealizados ||
      detail?.reservasCompletadas ||
      detail?.viajesCompletados ||
      [];

    const reservasCanceladasRaw =
      detail?.reservasCanceladas || detail?.viajesCancelados || detail?.canceladas || [];

    const reservasPendientes = reservasPendientesRaw.map((reserva: any) =>
      this.normalizeReserva(reserva),
    );

    const reservasRealizadas = reservasRealizadasRaw.map((reserva: any) =>
      this.normalizeReserva(reserva),
    );

    const reservasCanceladas = reservasCanceladasRaw.map((reserva: any) =>
      this.normalizeReserva(reserva),
    );

    const opiniones = (
      detail?.opiniones ||
      detail?.resenas ||
      detail?.reseñas ||
      detail?.reviews ||
      []
    ).map((opinion: any) => this.normalizeOpinion(opinion));

    const resumenRaw = detail?.resumen || {};

    const totalGastado =
      Number(resumenRaw?.totalGastado) ||
      Number(detail?.totalGastado) ||
      reservasRealizadas.reduce((total: number, reserva: ReservaAdminResponse) => {
        return total + Number(reserva.precioTotal || 0);
      }, 0);

    const destinosUnicos =
      Number(resumenRaw?.destinosUnicos) ||
      Number(detail?.destinosUnicos) ||
      new Set(
        reservasRealizadas
          .map((reserva: ReservaAdminResponse) => reserva.destinoNombre)
          .filter(Boolean),
      ).size;

    const resumen: AdminUserSummaryDTO = {
      viajesActivos:
        Number(resumenRaw?.viajesActivos) ||
        Number(resumenRaw?.viajesPendientes) ||
        Number(detail?.viajesActivos) ||
        reservasPendientes.length,
      viajesPendientes:
        Number(resumenRaw?.viajesPendientes) ||
        Number(detail?.viajesPendientes) ||
        reservasPendientes.length,
      viajesCancelados:
        Number(resumenRaw?.viajesCancelados) ||
        Number(detail?.viajesCancelados) ||
        reservasCanceladas.length,
      viajesRealizados:
        Number(resumenRaw?.viajesRealizados) ||
        Number(detail?.viajesRealizados) ||
        reservasRealizadas.length,
      destinosUnicos,
      kmRecorridos: Number(resumenRaw?.kmRecorridos || detail?.kmRecorridos || 0),
      saldo: Number(resumenRaw?.saldo || usuario.saldo || 0),
      totalGastado,
      totalReservas:
        Number(resumenRaw?.totalReservas) ||
        Number(detail?.totalReservas) ||
        reservasPendientes.length + reservasRealizadas.length + reservasCanceladas.length,
      totalOpiniones:
        Number(resumenRaw?.totalOpiniones) || Number(detail?.totalOpiniones) || opiniones.length,
      totalResenias:
        Number(resumenRaw?.totalResenias) ||
        Number(resumenRaw?.totalReseñas) ||
        Number(resumenRaw?.totalOpiniones) ||
        Number(detail?.totalResenias) ||
        Number(detail?.totalReseñas) ||
        Number(detail?.totalOpiniones) ||
        opiniones.length,
    };

    return {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      role: usuario.role,
      saldo: usuario.saldo,
      avatarUrl: usuario.avatarUrl,

      usuario,
      tarjeta: this.normalizeUserCard(detail?.tarjeta || detail?.cuentaBancaria || detail?.cuenta),
      resumen,

      reservasPendientes,
      reservasRealizadas,
      reservasCanceladas,
      opiniones,
    };
  }

  private normalizeUserCard(card: any): AdminUserCardDTO | null {
    if (!card) return null;

    const iban = card?.iban || '';
    const numero = card?.numero || card?.numeroTarjeta || '';

    return {
      titular: card?.titular || card?.nombreTitular || '',
      iban,
      swiftBic: card?.swiftBic || card?.swift_bic || '',
      swift_bic: card?.swift_bic || card?.swiftBic || '',
      entidad: card?.entidad || card?.banco || '',
      activa: card?.activa ?? true,
      last4: card?.last4 || card?.ultimos4 || numero?.slice(-4) || iban?.slice(-4) || '',
    };
  }

  private normalizeOpinion(opinion: any): AdminOpinionDTO {
    return {
      id: Number(opinion?.id || 0),
      alojamientoId: opinion?.alojamientoId,
      alojamientoNombre:
        opinion?.alojamientoNombre ||
        opinion?.hotelNombre ||
        opinion?.alojamiento?.nombre ||
        'Hotel',
      destinoNombre: opinion?.destinoNombre || opinion?.destino || '',
      puntuacion: Number(opinion?.puntuacion || opinion?.rating || 0),
      comentario: opinion?.comentario || opinion?.comment || '',
      fechaOpinion: opinion?.fechaOpinion || opinion?.date || '',
    };
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }
}
