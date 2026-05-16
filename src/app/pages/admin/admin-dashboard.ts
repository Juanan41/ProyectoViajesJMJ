// ProyectoViajesJMJ - pages\admin\admin-dashboard.ts
// Responsabilidad: funciones del panel de administracion y gestion operativa.
// Nota profesional: Centraliza operaciones sensibles del panel admin; revisar permisos y borrados antes de modificar.

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { Auth } from '../../services/auth';
import { environment } from '../../../environments/environment';
import { TranslatePipe } from '../../pipes/translate.pipe';
import {
  LucideAngularModule,
  Plus,
  Trash2,
  Edit,
  LayoutDashboard,
  Map,
  Users,
  TrendingUp,
  Search,
  X,
  Eye,
  Building2,
} from 'lucide-angular';
import {
  getDistanceFromMadridKm,
  toDestinationCoordinateKey,
} from '../../data/destination-coordinates';

type AdminTab = 'stats' | 'users' | 'destinos' | 'hoteles' | 'reservas';
type ReservaFilter = 'TODAS' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';
type HotelSort = 'nombre' | 'destino' | 'precio' | 'reservas';

interface AdminConfirmModal {
  action: 'delete-user' | 'delete-destino' | 'delete-hotel';
  id: number;
  title: string;
  message: string;
  confirmText: string;
}

interface AdminNoticeModal {
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface EditUserForm {
  id: number;
  username: string;
  email: string;
  role: string;
  saldo: number;
}

interface EditDestinoForm {
  nombre: string;
  pais: string;
  continente: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

interface EditHotelForm {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  tipo: string;
  precioPorNoche: number;
  destinoId: number | null;
}

interface AdminUserDetail {
  usuario: any;
  tarjeta: any | null;
  cuenta?: any | null;
  resumen: any;
  reservas?: any[];
  reservasPendientes: any[];
  reservasRealizadas: any[];
  reservasCanceladas: any[];
  resenias: any[];
  opiniones?: any[];
}

/**
 * Documento profesional: clase principal del archivo.
 * Centraliza operaciones sensibles del panel admin; revisar permisos y borrados antes de modificar.
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private destinoService = inject(DestinoService);
  private http = inject(HttpClient);
  private router = inject(Router);
  public auth = inject(Auth);

  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly EditIcon = Edit;
  readonly DashboardIcon = LayoutDashboard;
  readonly MapIcon = Map;
  readonly UsersIcon = Users;
  readonly StatsIcon = TrendingUp;
  readonly SearchIcon = Search;
  readonly XIcon = X;
  readonly EyeIcon = Eye;
  readonly HotelIcon = Building2;

  activeTab = signal<AdminTab>('stats');

  destinos = signal<DestinoDTO[]>([]);
  usuarios = signal<any[]>([]);
  reservas = signal<any[]>([]);

  hoteles = signal<any[]>([]);
  hotelesLoaded = signal(false);
  isLoadingHoteles = signal(false);
  hotelesLoadError = signal('');
  hotelPage = signal(1);
  hotelPageSize = 50;

  destinoPage = signal(1);
  destinoPageSize = 24;

  selectedReserva = signal<any | null>(null);

  selectedUserDetail = signal<AdminUserDetail | null>(null);
  isLoadingUserDetail = signal(false);
  userDetailError = signal('');

  reservaFilter = signal<ReservaFilter>('TODAS');
  reservaSearch = '';
  userSearch = '';
  destinoSearch = '';
  hotelSearch = '';
  hotelSort = signal<HotelSort>('nombre');

  isDeleting = signal(false);

  confirmModal = signal<AdminConfirmModal | null>(null);
  noticeModal = signal<AdminNoticeModal | null>(null);

  showUserModal = signal(false);
  isSavingUser = signal(false);
  userError = signal('');

  editUserForm: EditUserForm = {
    id: 0,
    username: '',
    email: '',
    role: 'USER',
    saldo: 0,
  };

  showDestinoModal = signal(false);
  destinoMode = signal<'create' | 'edit'>('create');
  destinoToEdit = signal<DestinoDTO | null>(null);
  isSavingDestino = signal(false);
  destinoError = signal('');

  editDestinoForm: EditDestinoForm = {
    nombre: '',
    pais: '',
    continente: 'Europa',
    precio: 0,
    descripcion: '',
    imagen: '',
  };

  showHotelModal = signal(false);
  hotelMode = signal<'create' | 'edit'>('create');
  hotelToEdit = signal<any | null>(null);
  isSavingHotel = signal(false);
  hotelError = signal('');

  editHotelForm: EditHotelForm = {
    id: 0,
    nombre: '',
    ciudad: '',
    pais: '',
    tipo: 'HOTEL',
    precioPorNoche: 0,
    destinoId: null,
  };

  hotelTypes = ['HOTEL'];

  continentes = ['Europa', 'Asia', 'África', 'América del Norte', 'América del Sur', 'Oceanía'];

  ngOnInit() {
    if (!this.auth.isCurrentUserAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.loadDestinos();
    this.loadUsuarios();
    this.loadReservas();
  }

  loadDestinos() {
    this.destinoService.getDestinos().subscribe({
      next: (data) => {
        this.destinos.set(data || []);
        this.destinoPage.set(1);
      },
      error: (err) => {
        console.error('Error cargando destinos', err);
        this.destinos.set([]);
      },
    });
  }

  loadUsuarios() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/usuarios`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (data) => this.usuarios.set(data || []),
        error: (err) => {
          console.error('Error cargando usuarios', err);
          this.usuarios.set([]);
        },
      });
  }

  loadReservas() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/reservas`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (data) => this.reservas.set(data || []),
        error: (err) => {
          console.error('Error cargando reservas', err);
          this.reservas.set([]);
        },
      });
  }

  loadHoteles() {
    this.isLoadingHoteles.set(true);
    this.hotelesLoadError.set('');

    this.http
      .get<any[]>(`${environment.apiUrl}/admin/alojamientos`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (data) => {
          this.hoteles.set(data || []);
          this.hotelesLoaded.set(true);
          this.hotelPage.set(1);
          this.isLoadingHoteles.set(false);
        },
        error: (err) => {
          console.error('Error cargando hoteles', err);
          this.hoteles.set([]);
          this.hotelesLoaded.set(false);
          this.isLoadingHoteles.set(false);
          this.hotelesLoadError.set('No se pudieron cargar los hoteles.');
        },
      });
  }

  setTab(tab: AdminTab) {
    this.activeTab.set(tab);

    if (tab === 'hoteles' && !this.hotelesLoaded()) {
      this.loadHoteles();
    }
  }

  goToDestino(destino: any) {
    if (!destino?.id) return;

    this.router.navigate(['/hotels', destino.id]);
  }

  goToHotel(hotel: any) {
    if (!hotel?.id) return;

    this.router.navigate(['/hotel', hotel.id]);
  }

  get filteredReservas() {
    const filter = this.reservaFilter();
    const query = this.normalize(this.reservaSearch);

    // El panel admin filtra en memoria los datos ya cargados para no multiplicar llamadas.
    return this.reservas().filter((reserva) => {
      const estado = this.getReservaStatus(reserva);
      const matchesStatus = filter === 'TODAS' || estado === filter;

      const text = this.normalize(
        [
          reserva.usuarioUsername,
          reserva.usuarioEmail,
          reserva.destinoNombre,
          reserva.alojamientoNombre,
          reserva.estado,
          reserva.id,
        ].join(' '),
      );

      return matchesStatus && (!query || text.includes(query));
    });
  }

  get filteredUsuarios() {
    const query = this.normalize(this.userSearch);

    return this.usuarios().filter((user) =>
      this.normalize([user.username, user.email, user.role].join(' ')).includes(query),
    );
  }

  get filteredDestinos() {
    const query = this.normalize(this.destinoSearch);

    return this.destinos().filter((destino) =>
      this.normalize(
        [destino.nombre, destino.pais, (destino as any).continente].join(' '),
      ).includes(query),
    );
  }

  get totalDestinoPages(): number {
    return Math.max(1, Math.ceil(this.filteredDestinos.length / this.destinoPageSize));
  }

  get paginatedDestinos() {
    const page = Math.min(this.destinoPage(), this.totalDestinoPages);
    const start = (page - 1) * this.destinoPageSize;
    const end = start + this.destinoPageSize;

    return this.filteredDestinos.slice(start, end);
  }

  get destinoPageStart(): number {
    if (this.filteredDestinos.length === 0) return 0;

    return (this.destinoPage() - 1) * this.destinoPageSize + 1;
  }

  get destinoPageEnd(): number {
    return Math.min(this.destinoPage() * this.destinoPageSize, this.filteredDestinos.length);
  }

  resetDestinoPagination() {
    this.destinoPage.set(1);
  }

  previousDestinoPage() {
    if (this.destinoPage() > 1) {
      this.destinoPage.update((page) => page - 1);
    }
  }

  nextDestinoPage() {
    if (this.destinoPage() < this.totalDestinoPages) {
      this.destinoPage.update((page) => page + 1);
    }
  }

  get filteredHoteles() {
    const query = this.normalize(this.hotelSearch);

    const hoteles = this.hoteles().filter((hotel) =>
      this.normalize(
        [hotel.nombre, hotel.ciudad, hotel.pais, hotel.destinoNombre, hotel.tipo].join(' '),
      ).includes(query),
    );

    return [...hoteles].sort((a, b) => {
      if (this.hotelSort() === 'precio') {
        return Number(a.precioPorNoche || 0) - Number(b.precioPorNoche || 0);
      }

      if (this.hotelSort() === 'reservas') {
        return Number(b.reservas || 0) - Number(a.reservas || 0);
      }

      if (this.hotelSort() === 'destino') {
        return String(a.destinoNombre || '').localeCompare(String(b.destinoNombre || ''));
      }

      return String(a.nombre || '').localeCompare(String(b.nombre || ''));
    });
  }

  get totalHotelPages(): number {
    return Math.max(1, Math.ceil(this.filteredHoteles.length / this.hotelPageSize));
  }

  get paginatedHoteles() {
    const page = Math.min(this.hotelPage(), this.totalHotelPages);
    const start = (page - 1) * this.hotelPageSize;
    const end = start + this.hotelPageSize;

    return this.filteredHoteles.slice(start, end);
  }

  get hotelPageStart(): number {
    if (this.filteredHoteles.length === 0) return 0;

    return (this.hotelPage() - 1) * this.hotelPageSize + 1;
  }

  get hotelPageEnd(): number {
    return Math.min(this.hotelPage() * this.hotelPageSize, this.filteredHoteles.length);
  }

  resetHotelPagination() {
    this.hotelPage.set(1);
  }

  previousHotelPage() {
    if (this.hotelPage() > 1) {
      this.hotelPage.update((page) => page - 1);
    }
  }

  nextHotelPage() {
    if (this.hotelPage() < this.totalHotelPages) {
      this.hotelPage.update((page) => page + 1);
    }
  }

  get totalRevenue(): number {
    return this.reservas().reduce((total, reserva) => total + Number(reserva.precioTotal || 0), 0);
  }

  get activeReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'CONFIRMADA')
      .length;
  }

  get canceledReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'CANCELADA')
      .length;
  }

  get completedReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'COMPLETADA')
      .length;
  }

  get topBookingUser(): string {
    const counts = new globalThis.Map<string, number>();

    this.reservas().forEach((reserva) => {
      const user = reserva.usuarioUsername || reserva.usuarioEmail || 'Sin usuario';
      counts.set(user, (counts.get(user) || 0) + 1);
    });

    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'Sin datos';
  }

  openReservaDetails(reserva: any) {
    this.selectedReserva.set(reserva);
  }

  closeReservaDetails() {
    this.selectedReserva.set(null);
  }

  openUserDetails(user: any) {
    if (!user?.id) return;

    // La ficha combina resumen, tarjeta, reservas y reseñas en una sola lectura de detalle.
    this.selectedUserDetail.set(null);
    this.userDetailError.set('');
    this.isLoadingUserDetail.set(true);

    this.http
      .get<AdminUserDetail>(`${environment.apiUrl}/admin/usuarios/${user.id}/detalle`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (detail) => {
          this.selectedUserDetail.set({
            ...detail,
            tarjeta: detail.tarjeta || detail.cuenta || null,
            resenias: detail.resenias || detail.opiniones || [],
            reservasPendientes: detail.reservasPendientes || [],
            reservasRealizadas: detail.reservasRealizadas || [],
            reservasCanceladas: detail.reservasCanceladas || [],
          });
          this.isLoadingUserDetail.set(false);
        },
        error: (err) => {
          console.error('Error cargando detalle de usuario', err);
          this.isLoadingUserDetail.set(false);
          this.userDetailError.set('No se pudo cargar la ficha del usuario.');
        },
      });
  }

  closeUserDetails() {
    this.selectedUserDetail.set(null);
    this.userDetailError.set('');
    this.isLoadingUserDetail.set(false);
  }

  getUserAvatar(user: any): string {
    return user?.avatarUrl || user?.avatar || user?.fotoPerfil || user?.imagen || '';
  }

  getUserInitial(user: any): string {
    const name = user?.username || user?.name || user?.email || 'U';

    return String(name).trim().charAt(0).toUpperCase() || 'U';
  }

  getUserVisitedDestinations(detail: AdminUserDetail | null): number {
    if (!detail) return 0;

    // Preferimos el resumen del backend y calculamos un respaldo si llega vacío.
    const backendValue = Number(detail.resumen?.destinosUnicos);

    if (Number.isFinite(backendValue) && backendValue > 0) {
      return backendValue;
    }

    const visited = (detail.reservasRealizadas || [])
      .map((reserva) => toDestinationCoordinateKey(reserva.destinoNombre))
      .filter(Boolean);

    return new Set(visited).size;
  }

  getUserTraveledKm(detail: AdminUserDetail | null): number {
    if (!detail) return 0;

    return (detail.reservasRealizadas || []).reduce((total, reserva) => {
      return total + getDistanceFromMadridKm(reserva.destinoNombre);
    }, 0);
  }

  getReservaStatus(reserva: any): string {
    const estado = String(reserva?.estado || '').toUpperCase();

    // Si el backend aún no marcó una reserva antigua como completada, se deriva por fecha fin.
    if (estado === 'CANCELADA') return 'CANCELADA';
    if (estado === 'COMPLETADA') return 'COMPLETADA';

    const checkOut = reserva?.checkOut || reserva?.fechaFin;
    const checkOutDate = this.parseDateOnly(checkOut);

    if (checkOutDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkOutDate < today) {
        return 'COMPLETADA';
      }
    }

    return 'CONFIRMADA';
  }

  getReservaStatusClass(reserva: any): string {
    const status = this.getReservaStatus(reserva);

    if (status === 'CANCELADA') {
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    }

    if (status === 'COMPLETADA') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }

    return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
  }

  formatDate(value: string | Date | undefined | null): string {
    const date = this.parseDateOnly(value);

    if (!date) return '-';

    return date.toLocaleDateString('es-ES');
  }

  formatMoney(value: number | string | undefined | null): string {
    return `${Number(value || 0).toFixed(2)}€`;
  }

  private parseDateOnly(value: string | Date | undefined | null): Date | null {
    if (!value) return null;

    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) return null;

      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    const text = String(value);

    if (!text) return null;

    const datePart = text.includes('T') ? text.split('T')[0] : text;
    const parts = datePart.split('-').map(Number);

    if (parts.length >= 3 && parts.every((part) => Number.isFinite(part))) {
      const [year, month, day] = parts;
      return new Date(year, month - 1, day);
    }

    const fallback = new Date(text);

    if (Number.isNaN(fallback.getTime())) return null;

    fallback.setHours(0, 0, 0, 0);
    return fallback;
  }

  private normalize(value: string | number | null | undefined): string {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  openEditUsuario(user: any) {
    this.userError.set('');

    this.editUserForm = {
      id: user.id,
      username: user.username || '',
      email: user.email || '',
      role: user.role || 'USER',
      saldo: Number(user.saldo || 0),
    };

    this.showUserModal.set(true);
  }

  closeUserModal() {
    if (this.isSavingUser()) return;

    this.showUserModal.set(false);
    this.userError.set('');
  }

  saveUser() {
    if (!this.editUserForm.username.trim() || !this.editUserForm.email.trim()) {
      this.userError.set('El nombre y el email son obligatorios.');
      return;
    }

    this.isSavingUser.set(true);
    this.userError.set('');

    this.http
      .put<any>(`${environment.apiUrl}/admin/usuarios/${this.editUserForm.id}`, this.editUserForm, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: () => {
          this.isSavingUser.set(false);
          this.showUserModal.set(false);
          this.loadUsuarios();

          this.noticeModal.set({
            type: 'success',
            title: 'Usuario actualizado',
            message: 'Los datos del usuario se han guardado correctamente.',
          });
        },
        error: (err) => {
          console.error('Error actualizando usuario', err);
          this.isSavingUser.set(false);

          const message =
            typeof err?.error === 'string'
              ? err.error
              : err?.error?.message || 'No se pudo actualizar el usuario.';

          this.userError.set(message);
        },
      });
  }

  deleteUsuario(id: number) {
    this.confirmModal.set({
      action: 'delete-user',
      id,
      title: 'Eliminar usuario',
      message: '¿Seguro que quieres eliminar este usuario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar usuario',
    });
  }

  openCreateDestino() {
    this.destinoMode.set('create');
    this.destinoToEdit.set(null);
    this.destinoError.set('');
    this.showDestinoModal.set(true);

    this.editDestinoForm = {
      nombre: '',
      pais: '',
      continente: 'Europa',
      precio: 0,
      descripcion: '',
      imagen: '',
    };
  }

  openEditDestino(destino: DestinoDTO) {
    this.destinoMode.set('edit');
    this.destinoToEdit.set(destino);
    this.destinoError.set('');
    this.showDestinoModal.set(true);

    this.editDestinoForm = {
      nombre: destino.nombre || '',
      pais: destino.pais || '',
      continente:
        (destino as any).continente || this.getContinenteName((destino as any).continenteId),
      precio: Number(destino.precio || 0),
      descripcion: destino.descripcion || '',
      imagen: (destino as any).imagenUrl || (destino as any).imagen || '',
    };
  }

  closeDestinoModal() {
    if (this.isSavingDestino()) return;

    this.showDestinoModal.set(false);
    this.destinoToEdit.set(null);
    this.destinoMode.set('create');
    this.destinoError.set('');
  }

  saveDestino() {
    if (!this.editDestinoForm.nombre.trim() || !this.editDestinoForm.pais.trim()) {
      this.destinoError.set('El nombre y el país son obligatorios.');
      return;
    }

    this.isSavingDestino.set(true);
    this.destinoError.set('');

    const mode = this.destinoMode();

    const request = {
      nombre: this.editDestinoForm.nombre,
      pais: this.editDestinoForm.pais,
      continente: this.editDestinoForm.continente,
      precio: Number(this.editDestinoForm.precio || 0),
      descripcion: this.editDestinoForm.descripcion,
      imagen: this.editDestinoForm.imagen,
    };

    const destino = this.destinoToEdit();

    const request$ =
      mode === 'edit' && destino
        ? this.http.put<DestinoDTO>(`${environment.apiUrl}/admin/destinos/${destino.id}`, request, {
            headers: this.getAuthHeaders(),
          })
        : this.http.post<DestinoDTO>(`${environment.apiUrl}/admin/destinos`, request, {
            headers: this.getAuthHeaders(),
          });

    request$.subscribe({
      next: () => {
        this.isSavingDestino.set(false);
        this.closeDestinoModal();
        this.loadDestinos();

        this.noticeModal.set({
          type: 'success',
          title: mode === 'edit' ? 'Destino actualizado' : 'Destino creado',
          message: 'Los cambios del destino se han guardado correctamente.',
        });
      },
      error: (err) => {
        console.error('Error guardando destino', err);
        this.isSavingDestino.set(false);

        const message =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.message || 'No se pudo guardar el destino.';

        this.destinoError.set(message);
      },
    });
  }

  deleteDestino(id: number) {
    if (!id) return;

    this.confirmModal.set({
      action: 'delete-destino',
      id,
      title: 'Eliminar destino',
      message:
        '¿Seguro que quieres eliminar este destino? Si tiene alojamientos asociados, no se podrá borrar.',
      confirmText: 'Eliminar destino',
    });
  }

  openCreateHotel() {
    this.hotelMode.set('create');
    this.hotelToEdit.set(null);
    this.hotelError.set('');
    this.showHotelModal.set(true);

    const firstDestino = this.destinos()[0];

    this.editHotelForm = {
      id: 0,
      nombre: '',
      ciudad: firstDestino?.nombre || '',
      pais: firstDestino?.pais || '',
      tipo: 'HOTEL',
      precioPorNoche: 0,
      destinoId: firstDestino?.id || null,
    };
  }

  openEditHotel(hotel: any) {
    this.hotelMode.set('edit');
    this.hotelToEdit.set(hotel);
    this.hotelError.set('');
    this.showHotelModal.set(true);

    this.editHotelForm = {
      id: hotel.id,
      nombre: hotel.nombre || '',
      ciudad: hotel.ciudad || '',
      pais: hotel.pais || '',
      tipo: hotel.tipo || 'HOTEL',
      precioPorNoche: Number(hotel.precioPorNoche || 0),
      destinoId: Number(hotel.destinoId || 0),
    };
  }

  closeHotelModal() {
    if (this.isSavingHotel()) return;

    this.showHotelModal.set(false);
    this.hotelToEdit.set(null);
    this.hotelError.set('');
  }

  onHotelDestinoChange(destinoId: number | string | null) {
    const destino = this.destinos().find((item) => item.id === Number(destinoId));

    if (!destino) return;

    this.editHotelForm.destinoId = destino.id;
    this.editHotelForm.ciudad = destino.nombre || this.editHotelForm.ciudad;
    this.editHotelForm.pais = destino.pais || this.editHotelForm.pais;
  }

  saveHotel() {
    if (!this.editHotelForm.nombre.trim() || !this.editHotelForm.destinoId) {
      this.hotelError.set('El nombre y el destino son obligatorios.');
      return;
    }

    this.isSavingHotel.set(true);
    this.hotelError.set('');

    const mode = this.hotelMode();

    const request = {
      nombre: this.editHotelForm.nombre,
      ciudad: this.editHotelForm.ciudad,
      pais: this.editHotelForm.pais,
      tipo: this.editHotelForm.tipo,
      precioPorNoche: Number(this.editHotelForm.precioPorNoche || 0),
      destinoId: this.editHotelForm.destinoId,
    };

    const hotel = this.hotelToEdit();

    const request$ =
      mode === 'edit' && hotel
        ? this.http.put<any>(`${environment.apiUrl}/admin/alojamientos/${hotel.id}`, request, {
            headers: this.getAuthHeaders(),
          })
        : this.http.post<any>(`${environment.apiUrl}/admin/alojamientos`, request, {
            headers: this.getAuthHeaders(),
          });

    request$.subscribe({
      next: () => {
        this.isSavingHotel.set(false);
        this.closeHotelModal();
        this.loadHoteles();

        this.noticeModal.set({
          type: 'success',
          title: mode === 'edit' ? 'Hotel actualizado' : 'Hotel creado',
          message: 'Los cambios del hotel se han guardado correctamente.',
        });
      },
      error: (err) => {
        console.error('Error guardando hotel', err);
        this.isSavingHotel.set(false);

        this.hotelError.set(
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.message || 'No se pudo guardar el hotel.',
        );
      },
    });
  }

  deleteHotel(id: number) {
    this.confirmModal.set({
      action: 'delete-hotel',
      id,
      title: 'Eliminar hotel',
      message:
        '¿Seguro que quieres eliminar este hotel? Si tiene reservas asociadas, no se podrá borrar.',
      confirmText: 'Eliminar hotel',
    });
  }

  cancelConfirm() {
    if (this.isDeleting()) return;

    this.confirmModal.set(null);
  }

  confirmAction() {
    const modal = this.confirmModal();

    if (!modal) return;

    if (modal.action === 'delete-user') {
      this.confirmDeleteUsuario(modal.id);
      return;
    }

    if (modal.action === 'delete-destino') {
      this.confirmDeleteDestino(modal.id);
      return;
    }

    if (modal.action === 'delete-hotel') {
      this.confirmDeleteHotel(modal.id);
    }
  }

  private confirmDeleteUsuario(id: number) {
    this.isDeleting.set(true);

    this.http
      .delete(`${environment.apiUrl}/admin/usuarios/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: () => {
          this.confirmModal.set(null);
          this.isDeleting.set(false);
          this.loadUsuarios();
          this.loadReservas();

          this.noticeModal.set({
            type: 'success',
            title: 'Usuario eliminado',
            message: 'El usuario se ha eliminado correctamente.',
          });
        },
        error: (err) => {
          console.error('Error eliminando usuario', err);
          this.confirmModal.set(null);
          this.isDeleting.set(false);

          const message =
            typeof err?.error === 'string'
              ? err.error
              : err?.error?.message || 'No se pudo eliminar el usuario.';

          this.noticeModal.set({
            type: 'error',
            title: 'No se pudo eliminar el usuario',
            message,
          });
        },
      });
  }

  private confirmDeleteDestino(id: number) {
    this.isDeleting.set(true);

    this.http
      .delete(`${environment.apiUrl}/admin/destinos/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: () => {
          this.confirmModal.set(null);
          this.isDeleting.set(false);
          this.loadDestinos();

          this.noticeModal.set({
            type: 'success',
            title: 'Destino eliminado',
            message: 'El destino se ha eliminado correctamente.',
          });
        },
        error: (err) => {
          console.error('Error eliminando destino', err);
          this.confirmModal.set(null);
          this.isDeleting.set(false);

          const message =
            typeof err?.error === 'string'
              ? err.error
              : err?.error?.message || 'No se pudo eliminar el destino.';

          this.noticeModal.set({
            type: 'error',
            title: 'No se pudo eliminar el destino',
            message,
          });
        },
      });
  }

  private confirmDeleteHotel(id: number) {
    this.isDeleting.set(true);

    this.http
      .delete(`${environment.apiUrl}/admin/alojamientos/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: () => {
          this.confirmModal.set(null);
          this.isDeleting.set(false);
          this.loadHoteles();

          this.noticeModal.set({
            type: 'success',
            title: 'Hotel eliminado',
            message: 'El hotel se ha eliminado correctamente.',
          });
        },
        error: (err) => {
          console.error('Error eliminando hotel', err);
          this.confirmModal.set(null);
          this.isDeleting.set(false);

          this.noticeModal.set({
            type: 'error',
            title: 'No se pudo eliminar el hotel',
            message:
              typeof err?.error === 'string'
                ? err.error
                : err?.error?.message || 'No se pudo eliminar el hotel.',
          });
        },
      });
  }

  closeNotice() {
    this.noticeModal.set(null);
  }

  getContinenteName(id: number | undefined | null): string {
    if (id === 1) return 'Europa';
    if (id === 2) return 'Asia';
    if (id === 3) return 'África';
    if (id === 4) return 'América del Norte';
    if (id === 5) return 'América del Sur';
    if (id === 6) return 'Oceanía';

    return 'Europa';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken() || localStorage.getItem('token');

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
