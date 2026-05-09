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

  getFlagUrl(codigoIso: string): string {
    return codigoIso ? `https://flagcdn.com/w40/${codigoIso.toLowerCase()}.png` : '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('continentId');
      if (id) {
        this.loadCountriesFromBack(Number(id));
      }
    });
  }

  private loadCountriesFromBack(id: number) {
    this.destinoService.getDestinosByContinente(id).subscribe({
      next: (data) => {
        this.countries.set(data);
        if (data && data.length > 0) {
          this.continent.set({
            name: data[0].continenteNombre,
            description: 'Descubre los mejores destinos de ' + data[0].continenteNombre,
          });
        }
      },
      error: (err) => console.error('Error cargando países:', err),
    });
  }
}
