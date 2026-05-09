import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import {
  LucideAngularModule,
  Plus,
  Trash2,
  Edit,
  LayoutDashboard,
  Map,
  Hotel,
} from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private destinoService = inject(DestinoService);

  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly EditIcon = Edit;
  readonly DashboardIcon = LayoutDashboard;
  readonly MapIcon = Map;
  readonly HotelIcon = Hotel;

  destinos = signal<DestinoDTO[]>([]);
  activeTab = signal<'destinos' | 'alojamientos'>('destinos');

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.destinoService.getDestinos().subscribe((data) => this.destinos.set(data));
  }

  deleteDestino(id: number) {
    if (confirm('¿Eliminar este destino?')) {
      console.log('Eliminando:', id);
    }
  }

  editDestino(destino: DestinoDTO) {
    console.log('Editando:', destino);
  }
}
