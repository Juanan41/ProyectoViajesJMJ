import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DestinoService } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
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
  results = signal<any[]>([]);
  isLoading = signal(true);

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
        console.error('Error en la búsqueda:', err);
        this.isLoading.set(false);
      },
    });
  }

  getArray(length: number): any[] {
    return new Array(length || 0);
  }
}
