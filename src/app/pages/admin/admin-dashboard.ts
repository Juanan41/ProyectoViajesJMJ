import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Users,
  MapPin,
  Hotel,
  CalendarCheck,
  Pencil,
  Trash2,
  Plus,
  Search,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-angular';
import {
  AdminHotelDTO,
  AdminService,
  AdminUserDetailDTO,
  ReservaAdminResponse,
} from '../../services/admin.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import {
  getDistanceFromMadridKm,
  toDestinationCoordinateKey,
} from '../../data/destination-coordinates';

type AdminTab = 'stats' | 'users' | 'destinos' | 'hoteles' | 'reservas';
type DestinoMode = 'create' | 'edit';
type HotelMode = 'create' | 'edit';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private adminService = inject(AdminService);

  readonly UsersIcon = Users;
  readonly MapPinIcon = MapPin;
  readonly HotelIcon = Hotel;
  readonly CalendarCheckIcon = CalendarCheck;
  readonly PencilIcon = Pencil;
  readonly TrashIcon = Trash2;
  readonly PlusIcon = Plus;
  readonly SearchIcon = Search;
  readonly EyeIcon = Eye;
  readonly XIcon = X;
  readonly CheckIcon = CheckCircle2;
  readonly AlertIcon = AlertTriangle;

  activeTab = signal<AdminTab>('stats');

  usuarios = signal<any[]>([]);
  destinos = signal<any[]>([]);
  reservas = signal<ReservaAdminResponse[]>([]);
  hoteles = signal<AdminHotelDTO[]>([]);

  userSearch = '';
  destinoSearch = '';
  hotelSearch = '';
  reservaSearch = '';
  reservaStatusFilter = 'ALL';

  userPage = signal(1);
  readonly userPageSize = 10;

  destinoPage = signal(1);
  readonly destinoPageSize = 12;

  hotelPage = signal(1);
  readonly hotelPageSize = 10;

  hotelSort: 'nombre' | 'destino' | 'precio' | 'reservas' = 'nombre';

  isLoadingHoteles = signal(false);
  hotelesLoadError = signal('');

  showUserModal = signal(false);
  selectedUser = signal<any | null>(null);
  isSavingUser = signal(false);
  userError = signal('');

  selectedUserDetail = signal<AdminUserDetailDTO | null>(null);
  isLoadingUserDetail = signal(false);
  userDetailError = signal('');

  showDestinoModal = signal(false);
  destinoMode = signal<DestinoMode>('create');
  selectedDestino = signal<any | null>(null);
  isSavingDestino = signal(false);
  destinoError = signal('');

  showHotelModal = signal(false);
  hotelMode = signal<HotelMode>('create');
  selectedHotel = signal<AdminHotelDTO | null>(null);
  isSavingHotel = signal(false);
  hotelError = signal('');

  selectedReserva = signal<ReservaAdminResponse | null>(null);

  isDeleting = signal(false);

  confirmModal = signal<{
    title: string;
    message: string;
    confirmText: string;
    action: () => void;
  } | null>(null);

  noticeModal = signal<{
    title: string;
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  userForm = {
    id: null as number | null,
    username: '',
    email: '',
    role: 'USER',
    saldo: 0,
  };

  destinoForm = {
    id: null as number | null,
    nombre: '',
    pais: '',
    continente: '',
    precio: 0,
    imagen: '',
    descripcion: '',
  };

  hotelForm = {
    id: null as number | null,
    destinoId: null as number | null,
    nombre: '',
    tipo: 'HOTEL',
    ciudad: '',
    pais: '',
    precioPorNoche: 0,
  };

  readonly continentes = [
    'Europa',
    'Asia',
    'África',
    'América del Norte',
    'América del Sur',
    'Oceanía',
  ];

  readonly hotelTypes = ['HOTEL', 'APARTAMENTO', 'RESORT', 'HOSTAL'];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loadUsuarios();
    this.loadDestinos();
    this.loadReservas();
    this.loadHoteles();
  }

  setTab(tab: AdminTab): void {
    this.activeTab.set(tab);

    if (tab === 'users') {
      this.resetUserPagination();
    }

    if (tab === 'destinos') {
      this.resetDestinoPagination();
    }

    if (tab === 'hoteles') {
      this.resetHotelPagination();
    }
  }

  loadUsuarios(): void {
    this.adminService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios.set(usuarios || []);
        this.resetUserPagination();
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.usuarios.set([]);
      },
    });
  }

  loadDestinos(): void {
    this.adminService.getDestinos().subscribe({
      next: (destinos) => {
        this.destinos.set(destinos || []);
        this.resetDestinoPagination();
      },
      error: (err) => {
        console.error('Error cargando destinos', err);
        this.destinos.set([]);
      },
    });
  }

  loadReservas(): void {
    this.adminService.getReservas().subscribe({
      next: (reservas) => {
        this.reservas.set(reservas || []);
      },
      error: (err) => {
        console.error('Error cargando reservas', err);
        this.reservas.set([]);
      },
    });
  }

  loadHoteles(): void {
    this.isLoadingHoteles.set(true);
    this.hotelesLoadError.set('');

    this.adminService.getHoteles().subscribe({
      next: (hoteles) => {
        this.hoteles.set(hoteles || []);
        this.isLoadingHoteles.set(false);
        this.resetHotelPagination();
      },
      error: (err) => {
        console.error('Error cargando hoteles', err);
        this.hoteles.set([]);
        this.isLoadingHoteles.set(false);
        this.hotelesLoadError.set('No se pudieron cargar los hoteles.');
      },
    });
  }

  get filteredUsuarios(): any[] {
    const search = this.normalize(this.userSearch);

    if (!search) {
      return this.usuarios();
    }

    return this.usuarios().filter((user) => {
      return (
        this.normalize(user.username).includes(search) ||
        this.normalize(user.email).includes(search) ||
        this.normalize(user.role).includes(search)
      );
    });
  }

  get paginatedUsuarios(): any[] {
    const start = (this.userPage() - 1) * this.userPageSize;
    return this.filteredUsuarios.slice(start, start + this.userPageSize);
  }

  get totalUserPages(): number {
    return Math.max(1, Math.ceil(this.filteredUsuarios.length / this.userPageSize));
  }

  get userPageStart(): number {
    if (this.filteredUsuarios.length === 0) return 0;
    return (this.userPage() - 1) * this.userPageSize + 1;
  }

  get userPageEnd(): number {
    return Math.min(this.userPage() * this.userPageSize, this.filteredUsuarios.length);
  }

  resetUserPagination(): void {
    this.userPage.set(1);
  }

  previousUserPage(): void {
    if (this.userPage() > 1) {
      this.userPage.update((page) => page - 1);
    }
  }

  nextUserPage(): void {
    if (this.userPage() < this.totalUserPages) {
      this.userPage.update((page) => page + 1);
    }
  }

  get filteredDestinos(): any[] {
    const search = this.normalize(this.destinoSearch);

    if (!search) {
      return this.destinos();
    }

    return this.destinos().filter((destino) => {
      return (
        this.normalize(destino.nombre).includes(search) ||
        this.normalize(destino.pais).includes(search) ||
        this.normalize(destino.continente).includes(search)
      );
    });
  }

  get paginatedDestinos(): any[] {
    const start = (this.destinoPage() - 1) * this.destinoPageSize;
    return this.filteredDestinos.slice(start, start + this.destinoPageSize);
  }

  get totalDestinoPages(): number {
    return Math.max(1, Math.ceil(this.filteredDestinos.length / this.destinoPageSize));
  }

  get destinoPageStart(): number {
    if (this.filteredDestinos.length === 0) return 0;
    return (this.destinoPage() - 1) * this.destinoPageSize + 1;
  }

  get destinoPageEnd(): number {
    return Math.min(this.destinoPage() * this.destinoPageSize, this.filteredDestinos.length);
  }

  resetDestinoPagination(): void {
    this.destinoPage.set(1);
  }

  previousDestinoPage(): void {
    if (this.destinoPage() > 1) {
      this.destinoPage.update((page) => page - 1);
    }
  }

  nextDestinoPage(): void {
    if (this.destinoPage() < this.totalDestinoPages) {
      this.destinoPage.update((page) => page + 1);
    }
  }

  get filteredHoteles(): AdminHotelDTO[] {
    const search = this.normalize(this.hotelSearch);

    const filtered = this.hoteles().filter((hotel) => {
      if (!search) return true;

      return (
        this.normalize(hotel.nombre).includes(search) ||
        this.normalize(hotel.destinoNombre).includes(search) ||
        this.normalize(hotel.ciudad).includes(search) ||
        this.normalize(hotel.pais).includes(search) ||
        this.normalize(hotel.tipo).includes(search)
      );
    });

    return filtered.sort((a, b) => {
      if (this.hotelSort === 'precio') {
        return Number(a.precioPorNoche || 0) - Number(b.precioPorNoche || 0);
      }

      if (this.hotelSort === 'reservas') {
        return Number(b.reservas || 0) - Number(a.reservas || 0);
      }

      if (this.hotelSort === 'destino') {
        return String(a.destinoNombre || '').localeCompare(String(b.destinoNombre || ''));
      }

      return String(a.nombre || '').localeCompare(String(b.nombre || ''));
    });
  }

  get paginatedHoteles(): AdminHotelDTO[] {
    const start = (this.hotelPage() - 1) * this.hotelPageSize;
    return this.filteredHoteles.slice(start, start + this.hotelPageSize);
  }

  get totalHotelPages(): number {
    return Math.max(1, Math.ceil(this.filteredHoteles.length / this.hotelPageSize));
  }

  get hotelPageStart(): number {
    if (this.filteredHoteles.length === 0) return 0;
    return (this.hotelPage() - 1) * this.hotelPageSize + 1;
  }

  get hotelPageEnd(): number {
    return Math.min(this.hotelPage() * this.hotelPageSize, this.filteredHoteles.length);
  }

  resetHotelPagination(): void {
    this.hotelPage.set(1);
  }

  previousHotelPage(): void {
    if (this.hotelPage() > 1) {
      this.hotelPage.update((page) => page - 1);
    }
  }

  nextHotelPage(): void {
    if (this.hotelPage() < this.totalHotelPages) {
      this.hotelPage.update((page) => page + 1);
    }
  }

  get filteredReservas(): ReservaAdminResponse[] {
    const search = this.normalize(this.reservaSearch);
    const status = this.reservaStatusFilter;

    return this.reservas().filter((reserva) => {
      const matchesSearch =
        !search ||
        this.normalize(reserva.usuarioUsername).includes(search) ||
        this.normalize(reserva.usuarioEmail).includes(search) ||
        this.normalize(reserva.destinoNombre).includes(search) ||
        this.normalize(reserva.alojamientoNombre).includes(search);

      const matchesStatus = status === 'ALL' || this.getReservaStatus(reserva) === status;

      return matchesSearch && matchesStatus;
    });
  }

  get totalRevenue(): number {
    return this.reservas()
      .filter((reserva) => this.getReservaStatus(reserva) !== 'CANCELADA')
      .reduce((total, reserva) => total + Number(reserva.precioTotal || 0), 0);
  }

  get activeReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'CONFIRMADA')
      .length;
  }

  get completedReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'COMPLETADA')
      .length;
  }

  get canceledReservationsCount(): number {
    return this.reservas().filter((reserva) => this.getReservaStatus(reserva) === 'CANCELADA')
      .length;
  }

  get topBookingUser(): string {
    const counter = new Map<string, number>();

    this.reservas().forEach((reserva) => {
      const name = reserva.usuarioUsername || reserva.usuarioEmail || 'Usuario';
      counter.set(name, (counter.get(name) || 0) + 1);
    });

    let topUser = '-';
    let topCount = 0;

    counter.forEach((count, user) => {
      if (count > topCount) {
        topUser = user;
        topCount = count;
      }
    });

    return topUser;
  }

  openUserModal(user: any): void {
    this.userError.set('');
    this.selectedUser.set(user);

    this.userForm = {
      id: user.id,
      username: user.username || '',
      email: user.email || '',
      role: user.role || 'USER',
      saldo: Number(user.saldo || 0),
    };

    this.showUserModal.set(true);
  }

  closeUserModal(): void {
    if (this.isSavingUser()) return;

    this.showUserModal.set(false);
    this.selectedUser.set(null);
    this.userError.set('');
  }

  saveUser(): void {
    if (!this.userForm.id) return;

    const username = this.userForm.username.trim();
    const email = this.userForm.email.trim();

    if (!username || !email) {
      this.userError.set('Todos los campos son obligatorios.');
      return;
    }

    this.isSavingUser.set(true);
    this.userError.set('');

    this.adminService
      .updateUsuario(this.userForm.id, {
        username,
        email,
        role: this.userForm.role,
        saldo: Number(this.userForm.saldo || 0),
      })
      .subscribe({
        next: () => {
          this.isSavingUser.set(false);
          this.showUserModal.set(false);
          this.showNotice(
            'Usuario actualizado',
            'El usuario se ha actualizado correctamente.',
            'success',
          );
          this.loadUsuarios();
        },
        error: (err) => {
          console.error('Error guardando usuario', err);
          this.isSavingUser.set(false);
          this.userError.set('No se pudo guardar el usuario.');
        },
      });
  }

  askDeleteUser(user: any): void {
    if (user.role === 'ADMIN') {
      this.showNotice(
        'No se pudo eliminar el usuario',
        'No se puede borrar un administrador',
        'error',
      );
      return;
    }

    this.confirmModal.set({
      title: 'Eliminar usuario',
      message: '¿Seguro que quieres eliminar este usuario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      action: () => this.deleteUser(user.id),
    });
  }

  deleteUser(id: number): void {
    this.isDeleting.set(true);

    this.adminService.deleteUsuario(id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.confirmModal.set(null);
        this.showNotice(
          'Usuario eliminado',
          'El usuario se ha eliminado correctamente.',
          'success',
        );
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error eliminando usuario', err);
        this.isDeleting.set(false);
        this.confirmModal.set(null);
        this.showNotice(
          'No se pudo eliminar el usuario',
          'Ha ocurrido un error al eliminar el usuario.',
          'error',
        );
      },
    });
  }

  openUserDetails(user: any): void {
    this.selectedUserDetail.set(null);
    this.userDetailError.set('');
    this.isLoadingUserDetail.set(true);

    this.adminService.getUsuarioDetalle(user.id).subscribe({
      next: (detail) => {
        this.selectedUserDetail.set(detail);
        this.isLoadingUserDetail.set(false);
      },
      error: (err) => {
        console.error('Error cargando ficha de usuario', err);
        this.userDetailError.set('No se pudo cargar la ficha del usuario.');
        this.isLoadingUserDetail.set(false);
      },
    });
  }

  closeUserDetails(): void {
    this.selectedUserDetail.set(null);
    this.isLoadingUserDetail.set(false);
    this.userDetailError.set('');
  }

  getUserVisitedDestinations(detail: AdminUserDetailDTO | null): number {
    if (!detail) return 0;

    if (Number(detail.resumen?.destinosUnicos || 0) > 0) {
      return Number(detail.resumen.destinosUnicos);
    }

    const reservas = [...(detail.reservasRealizadas || []), ...(detail.reservasPendientes || [])];

    const destinos = reservas
      .filter((reserva) => this.getReservaStatus(reserva) !== 'CANCELADA')
      .map((reserva) => toDestinationCoordinateKey(reserva.destinoNombre))
      .filter(Boolean);

    return new Set(destinos).size;
  }

  getUserTraveledKm(detail: AdminUserDetailDTO | null): number {
    if (!detail) return 0;

    if (Number(detail.resumen?.kmRecorridos || 0) > 0) {
      return Number(detail.resumen.kmRecorridos);
    }

    return (detail.reservasRealizadas || []).reduce((total, reserva) => {
      return total + getDistanceFromMadridKm(reserva.destinoNombre || '');
    }, 0);
  }

  getUserReservations(detail: AdminUserDetailDTO | null): ReservaAdminResponse[] {
    if (!detail) return [];

    return [
      ...(detail.reservasPendientes || []),
      ...(detail.reservasRealizadas || []),
      ...(detail.reservasCanceladas || []),
    ];
  }

  openCreateDestino(): void {
    this.destinoMode.set('create');
    this.selectedDestino.set(null);
    this.destinoError.set('');

    this.destinoForm = {
      id: null,
      nombre: '',
      pais: '',
      continente: this.continentes[0],
      precio: 0,
      imagen: '',
      descripcion: '',
    };

    this.showDestinoModal.set(true);
  }

  openEditDestino(destino: any): void {
    this.destinoMode.set('edit');
    this.selectedDestino.set(destino);
    this.destinoError.set('');

    this.destinoForm = {
      id: destino.id,
      nombre: destino.nombre || '',
      pais: destino.pais || '',
      continente: destino.continente || this.continentes[0],
      precio: Number(destino.precio || 0),
      imagen: destino.imagen || '',
      descripcion: destino.descripcion || '',
    };

    this.showDestinoModal.set(true);
  }

  closeDestinoModal(): void {
    if (this.isSavingDestino()) return;

    this.showDestinoModal.set(false);
    this.destinoError.set('');
    this.selectedDestino.set(null);
  }

  saveDestino(): void {
    const nombre = this.destinoForm.nombre.trim();
    const pais = this.destinoForm.pais.trim();

    if (!nombre || !pais || !this.destinoForm.continente) {
      this.destinoError.set('Todos los campos son obligatorios.');
      return;
    }

    if (Number(this.destinoForm.precio) <= 0) {
      this.destinoError.set('El precio debe ser mayor que 0.');
      return;
    }

    const dto = {
      nombre,
      pais,
      continente: this.destinoForm.continente,
      precio: Number(this.destinoForm.precio),
      imagen: this.destinoForm.imagen.trim(),
      descripcion: this.destinoForm.descripcion.trim(),
    };

    this.isSavingDestino.set(true);
    this.destinoError.set('');

    const request$ =
      this.destinoMode() === 'create'
        ? this.adminService.createDestino(dto)
        : this.adminService.updateDestino(this.destinoForm.id!, dto);

    request$.subscribe({
      next: () => {
        this.isSavingDestino.set(false);
        this.showDestinoModal.set(false);

        const title = this.destinoMode() === 'create' ? 'Destino creado' : 'Destino actualizado';
        const message =
          this.destinoMode() === 'create'
            ? 'El destino se ha creado correctamente.'
            : 'El destino se ha actualizado correctamente.';

        this.showNotice(title, message, 'success');
        this.loadDestinos();
      },
      error: (err) => {
        console.error('Error guardando destino', err);
        this.isSavingDestino.set(false);
        this.destinoError.set('No se pudo guardar el destino.');
      },
    });
  }

  askDeleteDestino(destino: any): void {
    this.confirmModal.set({
      title: 'Eliminar destino',
      message:
        '¿Seguro que quieres eliminar este destino? Si tiene reservas asociadas, puede que no se pueda borrar.',
      confirmText: 'Eliminar',
      action: () => this.deleteDestino(destino.id),
    });
  }

  deleteDestino(id: number): void {
    this.isDeleting.set(true);

    this.adminService.deleteDestino(id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.confirmModal.set(null);
        this.showNotice(
          'Destino eliminado',
          'El destino se ha eliminado correctamente.',
          'success',
        );
        this.loadDestinos();
      },
      error: (err) => {
        console.error('Error eliminando destino', err);
        this.isDeleting.set(false);
        this.confirmModal.set(null);
        this.showNotice(
          'No se pudo eliminar el destino',
          'No se pudo eliminar el destino.',
          'error',
        );
      },
    });
  }

  openCreateHotel(): void {
    this.hotelMode.set('create');
    this.selectedHotel.set(null);
    this.hotelError.set('');

    this.hotelForm = {
      id: null,
      destinoId: this.destinos()[0]?.id || null,
      nombre: '',
      tipo: 'HOTEL',
      ciudad: '',
      pais: '',
      precioPorNoche: 0,
    };

    this.showHotelModal.set(true);
  }

  openEditHotel(hotel: AdminHotelDTO): void {
    this.hotelMode.set('edit');
    this.selectedHotel.set(hotel);
    this.hotelError.set('');

    this.hotelForm = {
      id: hotel.id,
      destinoId: hotel.destinoId,
      nombre: hotel.nombre || '',
      tipo: hotel.tipo || 'HOTEL',
      ciudad: hotel.ciudad || '',
      pais: hotel.pais || '',
      precioPorNoche: Number(hotel.precioPorNoche || 0),
    };

    this.showHotelModal.set(true);
  }

  closeHotelModal(): void {
    if (this.isSavingHotel()) return;

    this.showHotelModal.set(false);
    this.selectedHotel.set(null);
    this.hotelError.set('');
  }

  saveHotel(): void {
    if (!this.hotelForm.destinoId || !this.hotelForm.nombre.trim()) {
      this.hotelError.set('El nombre y el destino son obligatorios.');
      return;
    }

    if (Number(this.hotelForm.precioPorNoche) <= 0) {
      this.hotelError.set('El precio debe ser mayor que 0.');
      return;
    }

    const dto = {
      destinoId: Number(this.hotelForm.destinoId),
      nombre: this.hotelForm.nombre.trim(),
      tipo: this.hotelForm.tipo,
      ciudad: this.hotelForm.ciudad.trim(),
      pais: this.hotelForm.pais.trim(),
      precioPorNoche: Number(this.hotelForm.precioPorNoche),
    };

    this.isSavingHotel.set(true);
    this.hotelError.set('');

    const request$ =
      this.hotelMode() === 'create'
        ? this.adminService.createHotel(dto)
        : this.adminService.updateHotel(this.hotelForm.id!, dto);

    request$.subscribe({
      next: () => {
        this.isSavingHotel.set(false);
        this.showHotelModal.set(false);

        const title = this.hotelMode() === 'create' ? 'Hotel creado' : 'Hotel actualizado';
        this.showNotice(title, 'Los cambios del hotel se han guardado correctamente.', 'success');
        this.loadHoteles();
      },
      error: (err) => {
        console.error('Error guardando hotel', err);
        this.isSavingHotel.set(false);
        this.hotelError.set('No se pudo guardar el hotel.');
      },
    });
  }

  askDeleteHotel(hotel: AdminHotelDTO): void {
    this.confirmModal.set({
      title: 'Eliminar hotel',
      message: '¿Seguro que quieres eliminar este hotel?',
      confirmText: 'Eliminar',
      action: () => this.deleteHotel(hotel.id),
    });
  }

  deleteHotel(id: number): void {
    this.isDeleting.set(true);

    this.adminService.deleteHotel(id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.confirmModal.set(null);
        this.showNotice('Hotel eliminado', 'El hotel se ha eliminado correctamente.', 'success');
        this.loadHoteles();
      },
      error: (err) => {
        console.error('Error eliminando hotel', err);
        this.isDeleting.set(false);
        this.confirmModal.set(null);
        this.showNotice('No se pudo eliminar el hotel', 'No se pudo eliminar el hotel.', 'error');
      },
    });
  }

  openReservaDetail(reserva: ReservaAdminResponse): void {
    this.selectedReserva.set(reserva);
  }

  closeReservaDetail(): void {
    this.selectedReserva.set(null);
  }

  closeConfirmModal(): void {
    if (this.isDeleting()) return;

    this.confirmModal.set(null);
  }

  confirmAction(): void {
    const modal = this.confirmModal();

    if (!modal || this.isDeleting()) return;

    modal.action();
  }

  showNotice(title: string, message: string, type: 'success' | 'error'): void {
    this.noticeModal.set({ title, message, type });
  }

  closeNotice(): void {
    this.noticeModal.set(null);
  }

  getReservaStatus(reserva: any): string {
    const estado = String(reserva?.estado || '').toUpperCase();

    if (estado === 'CANCELADA') return 'CANCELADA';

    const endDate = reserva?.checkOut || reserva?.fechaFin;

    if (endDate) {
      const today = new Date().toISOString().split('T')[0];
      const dateText = String(endDate).includes('T')
        ? String(endDate).split('T')[0]
        : String(endDate);

      if (dateText < today) {
        return 'COMPLETADA';
      }
    }

    return estado || 'CONFIRMADA';
  }

  formatMoney(value: number | string | undefined | null): string {
    const numberValue = Number(value || 0);

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(numberValue);
  }

  formatDate(value: string | Date | undefined | null): string {
    if (!value) return '-';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('es-ES');
  }

  private normalize(value: any): string {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
