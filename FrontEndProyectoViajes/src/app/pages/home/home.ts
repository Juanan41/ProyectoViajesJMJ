import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { DestinoCarousel } from '../../components/destino-carousel/destino-carousel';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LucideAngularModule, Map, Globe, Compass, Star } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DestinoCarousel, TranslatePipe, LucideAngularModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private destinoService = inject(DestinoService);

  readonly MapIcon = Map;
  readonly GlobeIcon = Globe;
  readonly CompassIcon = Compass;
  readonly StarIcon = Star;

  destinos = signal<DestinoDTO[]>([]);
  continentes = [
    {
      id: 1,
      nombre: 'Europa',
      imagen: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
    },
    {
      id: 2,
      nombre: 'Asia',
      imagen: 'https://images.unsplash.com/photo-1464817739973-0128fe77af1c',
    },
    {
      id: 3,
      nombre: 'África',
      imagen: 'https://images.unsplash.com/photo-1523805081446-99b25658aef3',
    },
    {
      id: 4,
      nombre: 'Oceanía',
      imagen: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    },
    {
      id: 5,
      nombre: 'América del Norte',
      imagen: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74',
    },
    {
      id: 6,
      nombre: 'América del Sur',
      imagen: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
    },
  ];

  ngOnInit() {
    this.cargarDestinos();
  }

  cargarDestinos() {
    this.destinoService.getDestinos().subscribe({
      next: (res) => this.destinos.set(res),
      error: (err) => console.error('Error cargando destinos:', err),
    });
  }
}
