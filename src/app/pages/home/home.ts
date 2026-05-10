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
        <app-destino-carousel [destinos]="destinos()"></app-destino-carousel>

        <div class="max-w-7xl mx-auto px-4 py-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-black text-white uppercase tracking-tighter mb-4">
              Descubre tu próximo <span class="text-emerald-500">Destino</span>
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto">
              Explora nuestra selección exclusiva de alojamientos y vive experiencias inolvidables
              en todo el mundo.
            </p>
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
