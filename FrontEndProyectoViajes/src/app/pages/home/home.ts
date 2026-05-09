import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DestinoService, DestinoDTO } from '../../services/destino.service';
import { DestinoCarousel } from '../../components/destino-carousel/destino-carousel';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LucideAngularModule, Map, Globe, Compass, Star } from 'lucide-angular';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DestinoCarousel, TranslatePipe, LucideAngularModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private destinoService = inject(DestinoService);
  auth = inject(Auth);

  readonly MapIcon = Map;
  readonly GlobeIcon = Globe;
  readonly CompassIcon = Compass;
  readonly StarIcon = Star;

  destinos = signal<DestinoDTO[]>([]);

  continentes = [
    {
      id: 1,
      nombre: 'Europa',
      imagen: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      nombre: 'Asia',
      imagen: 'https://picsum.photos/seed/asia/900/600',
    },
    {
      id: 3,
      nombre: 'África',
      imagen: 'https://picsum.photos/seed/africa/900/600',
    },
    {
      id: 4,
      nombre: 'Oceanía',
      imagen: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 5,
      nombre: 'América del Norte',
      imagen: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 6,
      nombre: 'América del Sur',
      imagen: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80',
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

  cambiarImagen(event: Event, nombreContinente: string) {
    const imagen = event.target as HTMLImageElement;

    const imagenesReserva: Record<string, string> = {
      Europa: 'https://picsum.photos/seed/europa/900/600',
      Asia: 'https://picsum.photos/seed/asia/900/600',
      África: 'https://picsum.photos/seed/africa/900/600',
      Oceanía: 'https://picsum.photos/seed/oceania/900/600',
      'América del Norte': 'https://picsum.photos/seed/america-norte/900/600',
      'América del Sur': 'https://picsum.photos/seed/america-sur/900/600',
    };

    imagen.src = imagenesReserva[nombreContinente] || 'https://picsum.photos/seed/viajes/900/600';
  }
}
