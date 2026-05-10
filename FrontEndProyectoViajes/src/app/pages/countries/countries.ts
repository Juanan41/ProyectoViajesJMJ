import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DestinoService } from '../../services/destino.service';
import { LucideAngularModule, ArrowLeft, ChevronRight, MapPin } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly MapPinIcon = MapPin;

  continent = signal<any>(null);
  countries = signal<any[]>([]);

  private continentesPorId: Record<number, string> = {
    1: 'Europa',
    2: 'Asia',
    3: 'África',
    4: 'Oceanía',
    5: 'América del Norte',
    6: 'América del Sur',
  };

  private codigosPais: Record<string, string> = {
    España: 'es',
    Francia: 'fr',
    Italia: 'it',
    'Reino Unido': 'gb',
    Grecia: 'gr',
    Austria: 'at',
    Japón: 'jp',
    Tailandia: 'th',
    China: 'cn',
    'Emiratos Árabes Unidos': 'ae',
    Australia: 'au',
    'Nueva Zelanda': 'nz',
    Marruecos: 'ma',
    Egipto: 'eg',
    Sudáfrica: 'za',
    Canadá: 'ca',
    'Estados Unidos': 'us',
    México: 'mx',
    Brasil: 'br',
    Argentina: 'ar',
    Perú: 'pe',
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('continentId'));

      if (id) {
        this.loadCountriesFromBack(id);
      }
    });
  }

  private loadCountriesFromBack(id: number) {
    const nombreContinente = this.continentesPorId[id];

    this.continent.set({
      name: nombreContinente,
      description: 'Descubre los mejores destinos de ' + nombreContinente,
    });

    this.destinoService.getDestinos().subscribe({
      next: (data: any[]) => {
        const filtrados = data.filter((destino) => {
          const continenteDestino = this.normalizar(destino.continente || destino.continenteNombre || '');
          const continenteActual = this.normalizar(nombreContinente);

          return continenteDestino === continenteActual;
        });

        this.countries.set(filtrados);
      },
      error: (err) => console.error('Error cargando países:', err),
    });
  }

  getFlagUrl(pais: string): string {
    const codigo = this.getCodigoPais(pais);
    return codigo ? `https://flagcdn.com/w40/${codigo}.png` : '';
  }

  getCodigoPais(pais: string): string {
    if (!pais) return '';
    return this.codigosPais[pais] || '';
  }

  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
