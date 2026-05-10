import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  ArrowLeft,
  MapPin,
  ArrowRight,
  Star,
  ChevronRight,
} from 'lucide-angular';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './cities.html',
})
export class Cities implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly MapPinIcon = MapPin;
  readonly ArrowRightIcon = ArrowRight;
  readonly StarIcon = Star;
  readonly ChevronRightIcon = ChevronRight;

  countryName = signal<string>('');
  cities = signal<DestinoDTO[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const country = params.get('country');
      if (country) {
        this.countryName.set(country);
        this.loadCities(country);
      }
    });
  }

  loadCities(country: string) {
    this.destinoService.getDestinosByPais(country).subscribe({
      next: (destinos) => {
        this.cities.set(destinos);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando ciudades:', err);
        this.isLoading.set(false);
      },
    });
  }

  getArray(length: number): any[] {
    return new Array(length || 0);
  }
}
