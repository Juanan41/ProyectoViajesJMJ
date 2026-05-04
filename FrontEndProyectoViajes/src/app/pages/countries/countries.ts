import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ArrowLeft, ChevronRight, MapPin } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DestinosApiService } from '../../services/destinos-api.service';
import { DestinoApi } from '../../data/destino-api';

interface ContinenteVista {
  id: string;
  name: string;
  description: string;
}

interface DestinoVista {
  id: number;
  nombre: string;
  pais: string;
  descripcion: string;
  precio: number;
  continente: string;
  image: string;
}

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  private route = inject(ActivatedRoute);
  private destinosApi = inject(DestinosApiService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly MapPinIcon = MapPin;

  loading = true;
  error = '';

  continent: ContinenteVista | undefined;
  countries: DestinoVista[] = [];

  private continentes: ContinenteVista[] = [
    {
      id: 'europa',
      name: 'Europa',
      description: 'Historia, cultura y arquitectura milenaria',
    },
    {
      id: 'asia',
      name: 'Asia',
      description: 'Tradición ancestral, tecnología y grandes contrastes',
    },
    {
      id: 'africa',
      name: 'África',
      description: 'Safari, desiertos, playas y culturas ancestrales',
    },
    {
      id: 'oceania',
      name: 'Oceanía',
      description: 'Playas paradisíacas y naturaleza única',
    },
    {
      id: 'america-norte',
      name: 'América del Norte',
      description: 'Grandes ciudades, cultura urbana y playas caribeñas',
    },
    {
      id: 'america-sur',
      name: 'América del Sur',
      description: 'Naturaleza, historia, gastronomía y cultura latina',
    },
  ];

  private flagMap: Record<string, string> = {
    españa: 'es',
    francia: 'fr',
    italia: 'it',
    'reino unido': 'gb',
    grecia: 'gr',
    austria: 'at',
    portugal: 'pt',
    alemania: 'de',
    suiza: 'ch',
    paisesbajos: 'nl',
    'países bajos': 'nl',
    belgica: 'be',
    bélgica: 'be',
    republicacheca: 'cz',
    'república checa': 'cz',

    japon: 'jp',
    japón: 'jp',
    tailandia: 'th',
    china: 'cn',
    'emiratos árabes unidos': 'ae',
    india: 'in',
    'corea del sur': 'kr',
    indonesia: 'id',
    maldivas: 'mv',
    vietnam: 'vn',
    singapur: 'sg',

    egipto: 'eg',
    marruecos: 'ma',
    kenia: 'ke',
    tanzania: 'tz',
    sudafrica: 'za',
    sudáfrica: 'za',

    australia: 'au',
    'nueva zelanda': 'nz',
    fiyi: 'fj',
    'polinesia francesa': 'pf',

    'estados unidos': 'us',
    mexico: 'mx',
    méxico: 'mx',
    canada: 'ca',
    canadá: 'ca',

    brasil: 'br',
    argentina: 'ar',
    peru: 'pe',
    perú: 'pe',
    colombia: 'co',
    chile: 'cl',
    uruguay: 'uy',
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const continentId = params.get('continentId');

      if (!continentId) {
        this.continent = undefined;
        this.countries = [];
        this.loading = false;
        return;
      }

      this.continent = this.continentes.find((c) => c.id === continentId);
      this.cargarDestinosPorContinente(continentId);
    });
  }

  private cargarDestinosPorContinente(continentId: string): void {
    this.loading = true;
    this.error = '';

    this.destinosApi.obtenerDestinos().subscribe({
      next: (destinos: DestinoApi[]) => {
        const nombreContinente = this.mapContinenteIdToNombre(continentId);

        this.countries = destinos
          .filter((destino) => this.normalizar(destino.continente) === this.normalizar(nombreContinente))
          .map((destino) => ({
            id: destino.id,
            nombre: destino.nombre,
            pais: destino.pais,
            descripcion: destino.descripcion,
            precio: destino.precio,
            continente: destino.continente,
            image: this.obtenerImagenDestino(destino),
          }));

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando destinos por continente:', err);
        this.error = 'No se pudieron cargar los destinos';
        this.countries = [];
        this.loading = false;
      },
    });
  }

  getFlagUrl(countryIdOrPais: string): string {
    const key = this.normalizar(countryIdOrPais);
    const code = this.flagMap[key];
    return code ? `https://flagcdn.com/w40/${code}.png` : '';
  }

  private mapContinenteIdToNombre(continentId: string): string {
    const map: Record<string, string> = {
      europa: 'Europa',
      asia: 'Asia',
      africa: 'África',
      oceania: 'Oceanía',
      'america-norte': 'América del Norte',
      'america-sur': 'América del Sur',
    };

    return map[continentId] ?? continentId;
  }

  private obtenerImagenDestino(destino: DestinoApi): string {
    if (destino.imagen && destino.imagen.trim() !== '') {
      return destino.imagen;
    }

    const imagenesPorContinente: Record<string, string> = {
      europa: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200',
      asia: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200',
      africa: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
      oceania: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200',
      'america del norte': 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1200',
      'america del sur': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200',
    };

    const key = this.normalizar(destino.continente);
    return imagenesPorContinente[key] ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200';
  }

  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
