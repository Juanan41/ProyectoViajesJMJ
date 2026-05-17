import { Component, OnInit, inject, signal } from '@angular/core';
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

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

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

  maxPrice: number | null = null;
  sortBy: SortOption = 'relevance';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const q = params['q'] || '';

      this.query.set(q);
      this.maxPrice = null;
      this.sortBy = 'relevance';
      this.performSearch(q);
    });
  }

  performSearch(query: string): void {
    this.isLoading.set(true);

    if (!query.trim()) {
      this.results.set([]);
      this.isLoading.set(false);
      return;
    }

    this.destinoService.searchDestinos(query).subscribe({
      next: (data) => {
        this.results.set(data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
        this.results.set([]);
        this.isLoading.set(false);
      },
    });
  }

  get filteredResults(): DestinoDTO[] {
    let filtered = [...this.results()];

    const priceLimit = Number(this.maxPrice || 0);

    if (priceLimit > 0) {
      filtered = filtered.filter((item) => this.getDisplayPrice(item) <= priceLimit);
    }

    switch (this.sortBy) {
      case 'price-asc':
        return filtered.sort((a, b) => this.getDisplayPrice(a) - this.getDisplayPrice(b));

      case 'price-desc':
        return filtered.sort((a, b) => this.getDisplayPrice(b) - this.getDisplayPrice(a));

      case 'rating-desc':
        return filtered.sort((a, b) => this.getRating(b) - this.getRating(a));

      case 'name-asc':
        return filtered.sort((a, b) =>
          String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es'),
        );

      case 'relevance':
      default:
        return filtered;
    }
  }

  get hasActiveFilters(): boolean {
    return Number(this.maxPrice || 0) > 0 || this.sortBy !== 'relevance';
  }

  getDisplayPrice(item: DestinoDTO): number {
    return Number(item.precioPorNoche || item.precio || 0);
  }

  getRating(item: DestinoDTO): number {
    return Number(item.rating || item.estrellas || 5);
  }

  getImage(item: DestinoDTO): string {
    return item.imagenUrl || item.imagen || 'assets/placeholder.jpg';
  }

  getArray(length: number): any[] {
    return new Array(Math.max(0, Math.round(length || 0)));
  }
}
