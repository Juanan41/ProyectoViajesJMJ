import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { Auth } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
  imports: [CommonModule, FormsModule, LucideAngularModule], // <- TranslatePipe eliminado de aquí
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private destinoService = inject(DestinoService);
  private http = inject(HttpClient);
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
  isLoading = signal(false);

  ngOnInit() {
    this.loadDestinos();
    this.loadUsuarios();
  }

  loadDestinos() {
    this.destinoService.getDestinos().subscribe((data) => this.destinos.set(data));
  }

  loadUsuarios() {
    this.http
      .get<any[]>(`${environment.apiUrl}/usuarios`, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` },
      })
      .subscribe((data) => this.usuarios.set(data));
  }

  deleteUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar a este usuario?')) {
      this.http
        .delete(`${environment.apiUrl}/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${this.auth.getToken()}` },
        })
        .subscribe(() => this.loadUsuarios());
    }
  }

  deleteDestino(id?: number) {
    if (!id) return;
    if (confirm('¿Eliminar este destino?')) {
      console.log('Borrando destino:', id);
    }
  }

  setTab(tab: 'stats' | 'users' | 'destinos') {
    this.activeTab.set(tab);
  }
}
