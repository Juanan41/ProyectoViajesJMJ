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
import { DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { finalize } from 'rxjs';

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
  isLoading = signal(true);
  private cityFilter = '';

  filters = {
    maxPrice: 5000,
    category: 'todos',
  };

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const city = params.get('city');
      this.cityFilter = city ? this.normalizeText(city) : '';
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadData(Number(id));
      }
    });
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  loadData(id: number) {
    this.isLoading.set(true);

    this.destinoService.getDestinoById(id).subscribe({
      next: (data) => {
        if (data) {
          this.city.set({
            name: data.nombre,
            image:
              data.imagenUrl ||
              data.imagen ||
              'https://images.unsplash.com/photo-1436491865332-7a61a109cc05q=80&w=800',
            description: data.descripcion,
          });
          this.country.set({ id: data.continenteId || 1 });
        }
      },
    });

    this.destinoService
      .getAlojamientosByDestino(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.alojamientos.set(data || []),
        error: () => this.alojamientos.set([]),
      });
  }

  get filteredHotels() {
    return this.alojamientos().filter((h) => {
      const priceOk = (h.precioPorNoche || h.precio || 0) <= this.filters.maxPrice;
      if (!priceOk) return false;

      if (!this.cityFilter) return true;
      const city = this.normalizeText(h.ciudad || '');
      return city === this.cityFilter;
    });
  }

  clearFilters() {
    this.filters = { maxPrice: 5000, category: 'todos' };
  }

  getArray(length: number): any[] {
    return new Array(length || 0);
  }
}
