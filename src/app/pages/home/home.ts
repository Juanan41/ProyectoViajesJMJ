import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoCarousel } from '../../components/destino-carousel/destino-carousel';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DestinoCarousel, TranslatePipe],
  template: `
    <div class="min-h-screen bg-[rgb(23,25,25)]">
      @if (isLoading()) {
        <div class="flex items-center justify-center py-32">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      } @else {
        <div class="max-w-7xl mx-auto px-4 pt-16 pb-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {{ 'Descubre tu próximo' | translate }}
              <span class="text-emerald-500">{{ 'Destino' | translate }}</span>
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-lg">
              {{
                'Explora nuestra selección exclusiva de alojamientos y vive experiencias inolvidables en todo el mundo.'
                  | translate
              }}
            </p>
          </div>
        </div>

        @if (destinos().length > 0) {
          <app-destino-carousel [destinos]="destinos()"></app-destino-carousel>
        }

        <div class="max-w-7xl mx-auto px-4 py-16">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="bg-[rgb(33,36,37)] p-8 rounded-[2rem] border border-gray-800 hover:border-emerald-500/30 transition-all shadow-xl"
            >
              <div
                class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <div class="text-emerald-500 text-2xl">✈</div>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                {{ 'Mejores Vuelos' | translate }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                {{
                  'Conexiones directas y cómodas para que tu única preocupación sea disfrutar del viaje.'
                    | translate
                }}
              </p>
            </div>
            <div
              class="bg-[rgb(33,36,37)] p-8 rounded-[2rem] border border-gray-800 hover:border-emerald-500/30 transition-all shadow-xl"
            >
              <div
                class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <div class="text-emerald-500 text-2xl font-black">H</div>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                {{ 'Hoteles Premium' | translate }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                {{
                  'Dormirás en los mejores alojamientos, seleccionados cuidadosamente por su calidad y ubicación.'
                    | translate
                }}
              </p>
            </div>
            <div
              class="bg-[rgb(33,36,37)] p-8 rounded-[2rem] border border-gray-800 hover:border-emerald-500/30 transition-all shadow-xl"
            >
              <div
                class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <div class="text-emerald-500 text-2xl">✓</div>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                {{ 'Seguro Total' | translate }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                {{
                  'Viaja con la tranquilidad de estar protegido en todo momento con nuestra cobertura exclusiva.'
                    | translate
                }}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class Home implements OnInit {
  private destinoService = inject(DestinoService);

  destinos = signal<DestinoDTO[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.destinoService.getDestinos().subscribe({
      next: (data) => {
        const filtered = (data || []).filter((d) => {
          const name = (d.nombre || '').toLowerCase();
          const country = (d.pais || '').toLowerCase();
          return !(name && country && name === country);
        });
        this.destinos.set(filtered);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando destinos de Home', err);
        this.isLoading.set(false);
      },
    });
  }
}
