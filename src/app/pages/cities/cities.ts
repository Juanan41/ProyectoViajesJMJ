import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LucideAngularModule, ArrowLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, LucideAngularModule],
  templateUrl: './cities.html',
})
export class Cities implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ChevronRightIcon = ChevronRight;

  countryName = signal<string>('');
  cities = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const country = params.get('country');
      if (country) {
        const decoded = decodeURIComponent(country);
        this.loadData(decoded);
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

  loadData(country: string) {
    this.isLoading.set(true);
    this.countryName.set(country);

    this.destinoService.getDestinosByPais(country).subscribe({
      next: (data) => {
        const destinos = data || [];
        const normalizedCountry = this.normalizeText(country);
        const cityDestinos = destinos.filter(
          (d) => this.normalizeText(d.nombre || '') !== normalizedCountry,
        );

        if (cityDestinos.length > 0) {
          this.cities.set(
            cityDestinos.map((d) => ({
              ...d,
              destinoId: d.id,
              imagen: d.imagen || d.imagenUrl,
            })),
          );
          this.isLoading.set(false);
          return;
        }

        const fallbackDestinoId = destinos[0]?.id;

        this.destinoService.getAlojamientos().subscribe({
          next: (alojamientos) => {
            const filtered = (alojamientos || []).filter(
              (a) => this.normalizeText(a.pais || '') === normalizedCountry,
            );
            const byCity = new Map<string, any>();

            filtered.forEach((a) => {
              const cityName = a.ciudad || a.nombre;
              if (!cityName) return;

              const current = byCity.get(cityName);
              const price = a.precioPorNoche || a.precio || 0;
              if (!current || price < current.precio) {
                byCity.set(cityName, {
                  id: fallbackDestinoId || a.destinoId || a.id,
                  destinoId: fallbackDestinoId || a.destinoId || a.id,
                  nombre: cityName,
                  descripcion: `Hoteles destacados en ${cityName}.`,
                  imagen: a.imagen || a.imagenUrl,
                  precio: price,
                });
              }
            });

            this.cities.set(Array.from(byCity.values()));
            this.isLoading.set(false);
          },
          error: () => {
            this.cities.set([]);
            this.isLoading.set(false);
          },
        });
      },
      error: () => {
        this.cities.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
