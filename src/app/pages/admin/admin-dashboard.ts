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
} from 'lucide-angular';

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

  activeTab = signal<'stats' | 'users' | 'destinos'>('stats');
  destinos = signal<DestinoDTO[]>([]);
  usuarios = signal<any[]>([]);
  reservas = signal<any[]>([]);
  isLoading = signal(false);

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
    this.destinoService.getDestinos().subscribe((data) => this.destinos.set(data));
  }

  loadUsuarios() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/usuarios`, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` },
      })
      .subscribe((data) => this.usuarios.set(data));
  }

  loadReservas() {
    this.http
      .get<any[]>(`${environment.apiUrl}/admin/reservas`, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` },
      })
      .subscribe((data) => this.reservas.set(data));
  }

  deleteUsuario(id: number) {
    if (confirm('?Est?s seguro de eliminar a este usuario?')) {
      this.http
        .delete(`${environment.apiUrl}/admin/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${this.auth.getToken()}` },
        })
        .subscribe(() => {
          this.loadUsuarios();
          this.loadReservas();
        });
    }
  }

  deleteDestino(id: number) {
    if (!id) return;
    if (confirm('?Eliminar este destino?')) {
      this.http
        .delete(`${environment.apiUrl}/admin/destinos/${id}`, {
          headers: { Authorization: `Bearer ${this.auth.getToken()}` },
        })
        .subscribe({
          next: () => this.loadDestinos(),
          error: (err) => {
            const message = err.error.message || 'No se pudo eliminar el destino.';
            alert(message);
          },
        });
    }
  }

  setTab(tab: 'stats' | 'users' | 'destinos') {
    this.activeTab.set(tab);
  }
}
