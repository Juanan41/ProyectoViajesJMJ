// ProyectoViajesJMJ - pages\countries\countries.ts
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ArrowLeft, MapPin, ArrowRight, ChevronRight } from 'lucide-angular';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Documento profesional: clase principal del archivo.
 * Soporta navegacion por destinos, paises, continentes y busqueda bilingue.
 */
@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './countries.html',
})
export class Countries implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly MapPinIcon = MapPin;
  readonly ArrowRightIcon = ArrowRight;
  readonly ChevronRightIcon = ChevronRight;

  continent = signal<any>(null);

  countries = signal<
    Array<{
      id: string;
      pais: string;
      nombre: string;
      descripcion: string;
      imagen: string;
      precio: number;
      routeParam: string;
    }>
  >([]);

  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        let numericId = Number(id);

        if (isNaN(numericId)) {
          const mapStr: Record<string, number> = {
            europe: 1,
            asia: 2,
            africa: 3,
            oceania: 4,
            'north-america': 5,
            'south-america': 6,
          };

          numericId = mapStr[id.toLowerCase()] || 1;
        }

        this.loadCountries(numericId);
      }
    });
  }

  loadCountries(contId: number) {
    this.isLoading.set(true);
    this.countries.set([]);

    const continentInfo: Record<string, any> = {
      '1': {
        id: 1,
        name: 'Europa',
        description: 'Descubre la historia, el arte y una cultura inigualable.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop',
      },
      '2': {
        id: 2,
        name: 'Asia',
        description: 'Explora maravillas ancestrales y ciudades vanguardistas.',
        image: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1600&auto=format&fit=crop',
      },
      '3': {
        id: 3,
        name: 'África',
        description: 'Naturaleza salvaje y paisajes únicos en el mundo.',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1600&auto=format&fit=crop',
      },
      '4': {
        id: 4,
        name: 'Oceanía',
        description: 'Islas paradisíacas y aventuras increíbles.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop',
      },
      '5': {
        id: 5,
        name: 'América del Norte',
        description: 'Ciudades icónicas y una gran diversidad natural.',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop',
      },
      '6': {
        id: 6,
        name: 'América del Sur',
        description: 'Cultura vibrante, selvas y maravillas naturales.',
        image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1600&auto=format&fit=crop',
      },
    };

    this.continent.set(continentInfo[contId.toString()] || continentInfo['1']);

    this.destinoService.getDestinos().subscribe({
      next: (destinos) => {
        const filtered = (destinos || []).filter((d) => Number(d.continenteId) === contId);
        const byCountry = new Map<string, DestinoDTO>();

        filtered.forEach((dest) => {
          const key = (dest.pais || '').trim();
          if (!key) return;

          const existing = byCountry.get(key);

          if (!existing) {
            byCountry.set(key, dest);
            return;
          }

          const existingPrice = existing.precio ?? Number.MAX_SAFE_INTEGER;
          const nextPrice = dest.precio ?? Number.MAX_SAFE_INTEGER;

          if (nextPrice < existingPrice) {
            byCountry.set(key, dest);
          }
        });

        const cards = Array.from(byCountry.entries())
          .map(([pais, dest]) => {
            const slug = this.createSlug(pais);

            return {
              id: slug || pais,
              pais,
              nombre: pais,
              descripcion: `Destinos destacados en ${pais}.`,
              imagen: this.getCountryImage(pais, dest.imagenUrl || dest.imagen),
              precio: dest.precio || dest.precioPorNoche || 0,
              routeParam: pais,
            };
          })
          .sort((a, b) => a.nombre.localeCompare(b.nombre));

        this.countries.set(cards);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando destinos:', err);
        this.countries.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private createSlug(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  getFlagUrl(pais: string): string {
    if (!pais) return 'assets/placeholder.jpg';

    const code = this.getCodigoPais(pais).toLowerCase();

    if (code === 'un') {
      return 'assets/placeholder.jpg';
    }

    return `https://flagcdn.com/w40/${code}.png`;
  }

  getCodigoPais(pais: string): string {
    if (!pais) return 'UN';

    const map: Record<string, string> = {
      España: 'ES',
      Francia: 'FR',
      Italia: 'IT',
      'Reino Unido': 'GB',
      Alemania: 'DE',
      Grecia: 'GR',
      Austria: 'AT',
      Portugal: 'PT',
      'República Checa': 'CZ',
      Hungría: 'HU',
      'Países Bajos': 'NL',
      Croacia: 'HR',
      Dinamarca: 'DK',
      Suecia: 'SE',
      Islandia: 'IS',
      Bélgica: 'BE',

      Japón: 'JP',
      China: 'CN',
      'Emiratos Árabes Unidos': 'AE',
      Tailandia: 'TH',
      India: 'IN',
      'Corea del Sur': 'KR',

      Egipto: 'EG',
      Marruecos: 'MA',
      Sudáfrica: 'ZA',
      Kenia: 'KE',
      Tanzania: 'TZ',

      Australia: 'AU',
      'Nueva Zelanda': 'NZ',
      Fiyi: 'FJ',
      'Polinesia Francesa': 'PF',

      'Estados Unidos': 'US',
      México: 'MX',
      Canadá: 'CA',

      Argentina: 'AR',
      Brasil: 'BR',
      Colombia: 'CO',
      Perú: 'PE',
      Chile: 'CL',
      Uruguay: 'UY',
    };

    return map[pais] || 'UN';
  }

  private getCountryImage(pais: string, fallback?: string): string {
    const map: Record<string, string> = {
      España: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1600&auto=format&fit=crop',
      Francia: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop',
      Italia: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1600&auto=format&fit=crop',
      'Reino Unido': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop',
      Grecia: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
      Austria: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1600&auto=format&fit=crop',
      Portugal: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1600&auto=format&fit=crop',
      'República Checa': 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1600&auto=format&fit=crop',
      Hungría: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=1600&auto=format&fit=crop',
      'Países Bajos': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1600&auto=format&fit=crop',
      Croacia: 'https://images.unsplash.com/photo-1555990538-c48dbe0d6f4b?q=80&w=1600&auto=format&fit=crop',
      Dinamarca: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1600&auto=format&fit=crop',
      Suecia: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1600&auto=format&fit=crop',
      Islandia: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1600&auto=format&fit=crop',
      Bélgica: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1600&auto=format&fit=crop',
    };

    return map[pais] || fallback || 'assets/placeholder.jpg';
  }
}
