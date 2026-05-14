import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { Auth } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
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
  Save,
  Eye,
  Building2,
} from 'lucide-angular';

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
  readonly SaveIcon = Save;
  readonly EyeIcon = Eye;
  readonly HotelIcon = Building2;

  activeTab = signal<AdminTab>('stats');
  destinos = signal<DestinoDTO[]>([]);
  usuarios = signal<any[]>([]);
  reservas = signal<any[]>([]);
  hoteles = signal<any[]>([]);
  selectedReserva = signal<any | null>(null);
  reservaFilter = signal<ReservaFilter>('TODAS');
  reservaSearch = '';
  userSearch = '';
  destinoSearch = '';
  hotelSearch = '';
  hotelSort = signal<HotelSort>('nombre');

  isLoading = signal(false);
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
    this.loadHoteles();
  }

  loadDestinos() {
    this.destinoService.getDestinos().subscribe((data) => this.destinos.set(data));
  }

  loadUsuarios() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/usuarios`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe((data) => this.usuarios.set(data));
  }

  loadReservas() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/reservas`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe((data) => this.reservas.set(data));
  }

  loadHoteles() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/alojamientos`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe((data) => this.hoteles.set(data));
  }

  setTab(tab: AdminTab) {
    this.activeTab.set(tab);
  }

  get filteredReservas() {
    const filter = this.reservaFilter();
    const query = this.normalize(this.reservaSearch);

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
      this.normalize([destino.nombre, destino.pais, (destino as any).continente].join(' ')).includes(query),
    );
  }

  get filteredHoteles() {
    const query = this.normalize(this.hotelSearch);
    const hoteles = this.hoteles().filter((hotel) =>
      this.normalize([hotel.nombre, hotel.ciudad, hotel.pais, hotel.destinoNombre, hotel.tipo].join(' ')).includes(query),
    );

    return [...hoteles].sort((a, b) => {
      if (this.hotelSort() === 'precio') return Number(a.precioPorNoche || 0) - Number(b.precioPorNoche || 0);
      if (this.hotelSort() === 'reservas') return Number(b.reservas || 0) - Number(a.reservas || 0);
      if (this.hotelSort() === 'destino') return String(a.destinoNombre || '').localeCompare(String(b.destinoNombre || ''));
      return String(a.nombre || '').localeCompare(String(b.nombre || ''));
    });
  }

  get totalRevenue(): number {
    return this.reservas().reduce((total, reserva) => total + Number(reserva.precioTotal || 0), 0);
  }

  get activeReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'CONFIRMADA').length;
  }

  get canceledReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'CANCELADA').length;
  }

  get completedReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'COMPLETADA').length;
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

  getReservaStatus(reserva: any): string {
    const estado = String(reserva?.estado || '').toUpperCase();

    if (estado === 'CANCELADA') return 'CANCELADA';
    if (estado === 'COMPLETADA') return 'COMPLETADA';

    const checkOut = reserva?.checkOut ? new Date(reserva.checkOut) : null;
    if (checkOut && !Number.isNaN(checkOut.getTime()) && checkOut < new Date()) {
      return 'COMPLETADA';
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

  formatDate(value: string | undefined | null): string {
    if (!value) return '-';

    return new Date(value).toLocaleDateString('es-ES');
  }

  formatMoney(value: number | undefined | null): string {
    return `${Number(value || 0).toFixed(2)}€`;
  }

  private normalize(value: string): string {
    return value
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
      continente: (destino as any).continente || this.getContinenteName(destino.continenteId),
      precio: Number(destino.precio || 0),
      descripcion: destino.descripcion || '',
      imagen: destino.imagenUrl || destino.imagen || '',
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
      this.destinoMode() === 'edit' && destino
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
          title: this.destinoMode() === 'edit' ? 'Destino actualizado' : 'Destino creado',
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
      this.hotelMode() === 'edit' && hotel
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
          title: this.hotelMode() === 'edit' ? 'Hotel actualizado' : 'Hotel creado',
          message: 'Los cambios del hotel se han guardado correctamente.',
        });
      },
      error: (err) => {
        console.error('Error guardando hotel', err);
        this.isSavingHotel.set(false);
        this.hotelError.set(typeof err?.error === 'string' ? err.error : err?.error?.message || 'No se pudo guardar el hotel.');
      },
    });
  }

  deleteHotel(id: number) {
    this.confirmModal.set({
      action: 'delete-hotel',
      id,
      title: 'Eliminar hotel',
      message: 'Seguro que quieres eliminar este hotel? Si tiene reservas asociadas, no se podra borrar.',
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
            message: typeof err?.error === 'string' ? err.error : err?.error?.message || 'No se pudo eliminar el hotel.',
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

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.auth.getToken()}`,
    };
  }
}
