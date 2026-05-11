import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoCarousel } from '../../components/destino-carousel/destino-carousel';
import { DestinoService, DestinoDTO } from '../../services/destino.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DestinoCarousel],
  template: `
    <div class="min-h-screen bg-[rgb(23,25,25)]">
      @if (isLoading()) {
        <div class="flex items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      } @else {
        <div class="max-w-7xl mx-auto px-4 pt-16 pb-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Descubre tu próximo <span class="text-emerald-500">Destino</span>
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-lg">
              Explora nuestra selección exclusiva de alojamientos y vive experiencias inolvidables
              en todo el mundo.
            </p>
          </div>
        </div>

        <app-destino-carousel [destinos]="destinos()"></app-destino-carousel>

        <div class="max-w-7xl mx-auto px-4 py-16">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <div
                class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <div class="w-6 h-6 text-emerald-500">✈️</div>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                Mejores Vuelos
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Conexiones directas y cómodas para que tu única preocupación sea disfrutar del
                viaje.
              </p>
            </div>
            <div
              class="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <div
                class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <div class="w-6 h-6 text-emerald-500">🏨</div>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                Hoteles Premium
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Dormirás en los mejores alojamientos, seleccionados cuidadosamente por su calidad y
                ubicación.
              </p>
            </div>
            <div
              class="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <div
                class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <div class="w-6 h-6 text-emerald-500">🛡️</div>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                Seguro Total
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Viaja con la tranquilidad de estar protegido en todo momento con nuestra cobertura
                exclusiva.
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
        this.destinos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }
}
