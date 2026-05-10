import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ArrowLeft, MapPin, ArrowRight, ChevronRight } from 'lucide-angular';
import { DestinoService } from '../../services/destino.service';
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
  countries = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCountries(Number(id));
      }
    });
  }

  loadCountries(contId: number) {
    const continentInfo: Record<string, any> = {
      '1': {
        id: 1,
        name: 'Europa',
        description: 'Descubre la historia, el arte y una cultura inigualable.',
      },
      '2': {
        id: 2,
        name: 'Asia',
        description: 'Explora maravillas ancestrales y ciudades vanguardistas.',
      },
      '3': {
        id: 3,
        name: 'África',
        description: 'Naturaleza salvaje y paisajes únicos en el mundo.',
      },
      '4': {
        id: 4,
        name: 'América del Norte',
        description: 'Ciudades icónicas y una gran diversidad natural.',
      },
      '5': {
        id: 5,
        name: 'América del Sur',
        description: 'Cultura vibrante, selvas y maravillas naturales.',
      },
      '6': { id: 6, name: 'Oceanía', description: 'Islas paradisíacas y aventuras increíbles.' },
    };

    this.continent.set(
      continentInfo[contId.toString()] || {
        id: contId,
        name: 'Continente',
        description: 'Explora nuestros destinos.',
      },
    );

    this.destinoService.getDestinos().subscribe({
      next: (destinos) => {
        const filtered = destinos.filter((d) => d.continenteId === contId);

        const uniqueCountries = new Map();
        filtered.forEach((d) => {
          if (!uniqueCountries.has(d.pais)) {
            uniqueCountries.set(d.pais, {
              name: d.pais,
              image: d.imagenUrl || d.imagen || 'assets/placeholder.jpg',
              destinationsCount: 1,
              pais: d.pais,
            });
          } else {
            uniqueCountries.get(d.pais).destinationsCount++;
          }
        });

        this.countries.set(Array.from(uniqueCountries.values()));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando países:', err);
        this.isLoading.set(false);
      },
    });
  }

  getFlagUrl(pais: string): string {
    const code = this.getCodigoPais(pais).toLowerCase();
    return code !== 'un' ? `https://flagcdn.com/w40/${code}.png` : 'assets/placeholder.jpg';
  }

  getCodigoPais(pais: string): string {
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
