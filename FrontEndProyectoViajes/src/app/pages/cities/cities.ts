import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { LucideAngularModule, ArrowLeft, ChevronRight, MapPin } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './cities.html',
  styleUrl: './cities.css',
})
export class Cities implements OnInit {
  private route = inject(ActivatedRoute);
  private destinoService = inject(DestinoService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly MapPinIcon = MapPin;

  countryName = signal<string | null>(null);
  cities = signal<DestinoDTO[]>([]);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const country = params.get('countryId');
      if (country) {
        this.countryName.set(country);
        this.loadCities(country);
      }
    });
  }

  private loadCities(country: string) {
    this.destinoService.getDestinosByPais(country).subscribe({
      next: (data: DestinoDTO[]) => {
        this.cities.set(data);
      },
      error: (err: any) => {
        console.error('Error cargando ciudades:', err);
      },
    });
  }
}
