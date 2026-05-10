import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Star,
  MapPin,
  ArrowRight,
  Plane,
  Train,
  Ship,
  ArrowLeft,
  Wifi,
  Coffee,
} from 'lucide-angular';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './hotels.html',
})
export class Hotels implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly StarIcon = Star;
  readonly MapPinIcon = MapPin;
  readonly ArrowRightIcon = ArrowRight;
  readonly PlaneIcon = Plane;
  readonly TrainIcon = Train;
  readonly ShipIcon = Ship;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly WifiIcon = Wifi;
  readonly CoffeeIcon = Coffee;

  city = signal<any>(null);
  country = signal<any>(null);
  alojamientos = signal<any[]>([]);

  filters = {
    maxPrice: 5000,
    category: 'todos',
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadData(Number(id));
      }
    });
  }

  loadData(id: number) {
    this.destinoService.getDestinoById(id).subscribe({
      next: (data: DestinoDTO) => {
        this.city.set({
          name: data.nombre,
          image: data.imagenUrl || data.imagen,
          description: data.descripcion,
        });
        this.country.set({ id: data.continenteId || 1 });
      },
      error: (err: any) => console.error('Error cargando destino:', err),
    });

    this.destinoService.getAlojamientosByDestino(id).subscribe({
      next: (data: any[]) => this.alojamientos.set(data),
      error: (err: any) => console.error('Error cargando alojamientos:', err),
    });
  }

  get filteredHotels() {
    return this.alojamientos().filter((h) => {
      if (
        this.filters.maxPrice < 5000 &&
        (h.precioPorNoche || h.precio || 0) > this.filters.maxPrice
      )
        return false;
      return true;
    });
  }

  clearFilters() {
    this.filters = { maxPrice: 5000, category: 'todos' };
  }

  getArray(length: number): any[] {
    return new Array(length || 0);
  }
}
