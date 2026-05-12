import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ArrowLeft, MapPin, ArrowRight, ChevronRight } from 'lucide-angular';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

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
            'north-america': 4,
            'south-america': 5,
            oceania: 6,
          };
          numericId = mapStr[id.toLowerCase()] || 1;
        }
        this.loadCountries(numericId);
      }
    });
  }

  loadCountries(contId: number) {
    const continentInfo: Record<string, any> = {
      '1': {
        id: 1,
        name: 'Europa',
        description: 'Descubre la historia, el arte y una cultura inigualable.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020',
      },
      '2': {
        id: 2,
        name: 'Asia',
        description: 'Explora maravillas ancestrales y ciudades vanguardistas.',
        image: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070',
      },
      '3': {
        id: 3,
        name: 'África',
        description: 'Naturaleza salvaje y paisajes únicos en el mundo.',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1972',
      },
      '4': {
        id: 4,
        name: 'América del Norte',
        description: 'Ciudades icónicas y una gran diversidad natural.',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
      },
      '5': {
        id: 5,
        name: 'América del Sur',
        description: 'Cultura vibrante, selvas y maravillas naturales.',
        image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2076',
      },
      '6': {
        id: 6,
        name: 'Oceanía',
        description: 'Islas paradisíacas y aventuras increíbles.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070',
      },
    };

    this.continent.set(continentInfo[contId.toString()]);

    this.destinoService.getDestinos().subscribe({
      next: (destinos) => {
        const filtered = destinos.filter((d) => d.continenteId === contId);
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

        const cards = Array.from(byCountry.entries()).map(([pais, dest]) => {
          const slug = pais
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

          return {
            id: slug || pais,
            pais,
            nombre: pais,
            descripcion: `Destinos destacados en ${pais}.`,
            imagen: dest.imagenUrl || dest.imagen || 'assets/placeholder.jpg',
            precio: dest.precio || 0,
            routeParam: pais,
          };
        });

        this.countries.set(cards);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando destinos:', err);
        this.isLoading.set(false);
      },
    });
  }

  getFlagUrl(pais: string): string {
    if (!pais) return 'assets/placeholder.jpg';
    const code = this.getCodigoPais(pais).toLowerCase();
    return code !== 'un' ? `https://flagcdn.com/w40/${code}.png` : 'assets/placeholder.jpg';
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
      'Países Bajos': 'NL',
      Austria: 'AT',
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
      'Estados Unidos': 'US',
      México: 'MX',
      Canadá: 'CA',
      Argentina: 'AR',
      Brasil: 'BR',
      Colombia: 'CO',
      Perú: 'PE',
      Chile: 'CL',
      Australia: 'AU',
      'Nueva Zelanda': 'NZ',
      Fiyi: 'FJ',
    };
    return map[pais] || 'UN';
  }
}
