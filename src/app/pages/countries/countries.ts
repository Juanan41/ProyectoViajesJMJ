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
    this.isLoading.set(true);
    this.countries.set([]);

    const continentInfo: Record<string, any> = {
      '1': {
        id: 1,
        name: 'Europa',
        description: 'Descubre la historia, el arte y una cultura inigualable.',
        image:
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop',
      },
      '2': {
        id: 2,
        name: 'Asia',
        description: 'Explora maravillas ancestrales y ciudades vanguardistas.',
        image:
          'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1600&auto=format&fit=crop',
      },
      '3': {
        id: 3,
        name: 'África',
        description: 'Naturaleza salvaje y paisajes únicos en el mundo.',
        image:
          'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1600&auto=format&fit=crop',
      },
      '4': {
        id: 4,
        name: 'América del Norte',
        description: 'Ciudades icónicas y una gran diversidad natural.',
        image:
          'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop',
      },
      '5': {
        id: 5,
        name: 'América del Sur',
        description: 'Cultura vibrante, selvas y maravillas naturales.',
        image:
          'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1600&auto=format&fit=crop',
      },
      '6': {
        id: 6,
        name: 'Oceanía',
        description: 'Islas paradisíacas y aventuras increíbles.',
        image:
          'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop',
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
      Suiza: 'CH',
      Polonia: 'PL',
      Irlanda: 'IE',

      Japón: 'JP',
      China: 'CN',
      'Emiratos Árabes Unidos': 'AE',
      Tailandia: 'TH',
      India: 'IN',
      'Corea del Sur': 'KR',
      Qatar: 'QA',
      Vietnam: 'VN',
      Indonesia: 'ID',
      Nepal: 'NP',
      Filipinas: 'PH',
      Israel: 'IL',
      Malasia: 'MY',
      Singapur: 'SG',
      Turquía: 'TR',

      Egipto: 'EG',
      Marruecos: 'MA',
      Sudáfrica: 'ZA',
      Kenia: 'KE',
      Tanzania: 'TZ',
      Nigeria: 'NG',
      Ruanda: 'RW',
      Senegal: 'SN',
      Mauricio: 'MU',
      Namibia: 'NA',
      Túnez: 'TN',
      Argelia: 'DZ',
      Etiopía: 'ET',
      Ghana: 'GH',
      Seychelles: 'SC',

      'Estados Unidos': 'US',
      México: 'MX',
      Mexico: 'MX',
      Canadá: 'CA',
      Canada: 'CA',
      Bahamas: 'BS',
      Belice: 'BZ',
      Cuba: 'CU',
      'El Salvador': 'SV',
      Guatemala: 'GT',
      Honduras: 'HN',
      Panamá: 'PA',
      Panama: 'PA',
      'Puerto Rico': 'PR',
      'República Dominicana': 'DO',
      'Republica Dominicana': 'DO',
      Curazao: 'CW',
      'Costa Rica': 'CR',
      Jamaica: 'JM',
      Nicaragua: 'NI',

      Argentina: 'AR',
      Brasil: 'BR',
      Colombia: 'CO',
      Perú: 'PE',
      Peru: 'PE',
      Chile: 'CL',
      Uruguay: 'UY',
      Aruba: 'AW',
      Bolivia: 'BO',
      Ecuador: 'EC',
      Paraguay: 'PY',
      Venezuela: 'VE',
      Guyana: 'GY',
      'Guayana Francesa': 'GF',
      Surinam: 'SR',

      Australia: 'AU',
      'Nueva Zelanda': 'NZ',
      Fiyi: 'FJ',
      Fiji: 'FJ',
      'Polinesia Francesa': 'PF',
      Samoa: 'WS',
      Tonga: 'TO',
      Vanuatu: 'VU',
      Kiribati: 'KI',
      Micronesia: 'FM',
      Guam: 'GU',
      'Islas Cook': 'CK',
      'Islas Salomón': 'SB',
      'Islas Salomon': 'SB',
      'Papúa Nueva Guinea': 'PG',
      'Papua Nueva Guinea': 'PG',
      'Nueva Caledonia': 'NC',
      Palaos: 'PW',
      Palau: 'PW',
    };

    return map[pais] || 'UN';
  }

  private getCountryImage(pais: string, fallback?: string): string {
    const map: Record<string, string> = {
      España:
        'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1600&auto=format&fit=crop',
      Francia:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop',
      Italia:
        'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1600&auto=format&fit=crop',
      'Reino Unido':
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop',
      Grecia:
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
      Austria:
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1600&auto=format&fit=crop',
      Portugal:
        'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1600&auto=format&fit=crop',
      'República Checa':
        'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1600&auto=format&fit=crop',
      Hungría:
        'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=1600&auto=format&fit=crop',
      'Países Bajos':
        'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1600&auto=format&fit=crop',
      Croacia:
        'https://images.unsplash.com/photo-1555990538-c48dbe0d6f4b?q=80&w=1600&auto=format&fit=crop',
      Dinamarca:
        'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1600&auto=format&fit=crop',
      Suecia:
        'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1600&auto=format&fit=crop',
      Islandia:
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1600&auto=format&fit=crop',
      Bélgica:
        'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1600&auto=format&fit=crop',

      India:
        'https://images.unsplash.com/photo-1774934950562-755df93e1c88?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Indonesia:
        'https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Malasia:
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      Argelia:
        'https://images.unsplash.com/photo-1656978310683-d415ee895c2c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Senegal:
        'https://images.unsplash.com/photo-1681225241052-ac67808b0c62?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      Bahamas:
        'https://images.unsplash.com/photo-1501698335706-90b736210a61?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Belice:
        'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Canadá:
        'https://images.unsplash.com/photo-1519832979-6fa011b87667?q=80&w=1706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Canada:
        'https://images.unsplash.com/photo-1519832979-6fa011b87667?q=80&w=1706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Cuba: 'https://images.unsplash.com/photo-1581253058396-24685f752e68?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Panamá:
        'https://images.unsplash.com/photo-1632505702897-cc41b0ba3b64?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Panama:
        'https://images.unsplash.com/photo-1632505702897-cc41b0ba3b64?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Puerto Rico':
        'https://images.unsplash.com/photo-1625642471723-12744e6e4211?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'República Dominicana':
        'https://images.unsplash.com/photo-1697302611781-5166533305da?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Republica Dominicana':
        'https://images.unsplash.com/photo-1697302611781-5166533305da?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

      Guam: 'https://images.unsplash.com/photo-1587101118649-cd27302cfdeb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Kiribati:
        'https://images.unsplash.com/photo-1590491484047-3fc9757d5fba?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Islas Salomón':
        'https://images.unsplash.com/photo-1627512729059-fb322f8436f7?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Islas Salomon':
        'https://images.unsplash.com/photo-1627512729059-fb322f8436f7?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Micronesia:
        'https://images.unsplash.com/photo-1553602889-f85ab725f992?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      Vanuatu:
        'https://images.unsplash.com/photo-1672812407183-001d3533f49a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };

    return map[pais] || fallback || 'assets/placeholder.jpg';
  }
}
