import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LucideAngularModule, ArrowLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, LucideAngularModule],
  templateUrl: './cities.html',
})
export class Cities implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ChevronRightIcon = ChevronRight;

  countryName = signal<string>('');
  cities = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: number) {
    this.isLoading.set(true);

    this.destinoService.getDestinoById(id).subscribe({
      next: (dest) => {
        this.countryName.set((dest.ciudad || dest.nombre || dest.pais || 'Destino') as string);
      },
      error: () => {},
    });

    this.destinoService.getAlojamientosByDestino(id).subscribe({
      next: (data) => {
        this.cities.set(data || []);
        this.isLoading.set(false);
      },
      error: () => {
        this.cities.set([]);
        this.isLoading.set(false);
      },
    });
  }
}
