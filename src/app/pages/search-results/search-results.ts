// ProyectoViajesJMJ - pages\search-results\search-results.ts
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Search,
  MapPin,
  Star,
  ArrowRight,
  Filter,
  Plane,
} from 'lucide-angular';
import { DestinoDTO, DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

type SortOption = 'relevance' | 'priceAsc' | 'priceDesc' | 'nameAsc';

/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './search-results.html',
})
export class SearchResults implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly SearchIcon = Search;
  readonly MapPinIcon = MapPin;
  readonly StarIcon = Star;
  readonly ArrowRightIcon = ArrowRight;
  readonly FilterIcon = Filter;
  readonly PlaneIcon = Plane;

  query = signal('');
  results = signal<DestinoDTO[]>([]);
  isLoading = signal(true);
  showFilters = signal(false);

  filters = {
    maxPrice: 5000,
    continentId: 0,
    sort: 'relevance' as SortOption,
  };

  readonly continentes = [
    { id: 0, name: 'Todos los continentes' },
    { id: 1, name: 'Europa' },
    { id: 2, name: 'Asia' },
    { id: 3, name: 'África' },
    { id: 4, name: 'América del Norte' },
    { id: 5, name: 'América del Sur' },
    { id: 6, name: 'Oceanía' },
  ];

  filteredResults = computed(() => {
    const filtered = this.results().filter((item) => {
      const price = this.getPrice(item);
      const matchesPrice = price <= this.filters.maxPrice;
      const matchesContinent =
        this.filters.continentId === 0 || Number(item.continenteId) === this.filters.continentId;

      return matchesPrice && matchesContinent;
    });

    return [...filtered].sort((a, b) => {
      if (this.filters.sort === 'priceAsc') return this.getPrice(a) - this.getPrice(b);
      if (this.filters.sort === 'priceDesc') return this.getPrice(b) - this.getPrice(a);
      if (this.filters.sort === 'nameAsc') return (a.nombre || '').localeCompare(b.nombre || '');
      return 0;
    });
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const q = params['q'] || '';
      this.query.set(q);
      this.performSearch(q);
    });
  }

  performSearch(query: string) {
    this.isLoading.set(true);
    if (!query.trim()) {
      this.results.set([]);
      this.isLoading.set(false);
      return;
    }

    this.destinoService.searchDestinos(query).subscribe({
      next: (data) => {
        this.results.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando resultados de búsqueda', err);
        this.results.set([]);
        this.isLoading.set(false);
      },
    });
  }

  toggleFilters() {
    this.showFilters.update((value) => !value);
  }

  clearFilters() {
    this.filters = {
      maxPrice: 5000,
      continentId: 0,
      sort: 'relevance',
    };
  }

  getPrice(item: DestinoDTO): number {
    return Number(item.precioPorNoche || item.precio || 0);
  }

  getArray(length: number): any[] {
    return new Array(length || 0);
  }
}
