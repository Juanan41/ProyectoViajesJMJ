import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-continents',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './continents.html',
})
export class Continents {
  readonly ChevronRightIcon = ChevronRight;

  // Estas son las fotos reales emparejadas con sus cabeceras
  continents = [
    {
      id: 1,
      name: 'Europa',
      description: 'Descubre la historia, el arte y una cultura inigualable.',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020',
    },
    {
      id: 2,
      name: 'Asia',
      description: 'Explora maravillas ancestrales y ciudades vanguardistas.',
      image: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070',
    },
    {
      id: 3,
      name: 'África',
      description: 'Naturaleza salvaje y paisajes únicos en el mundo.',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1972',
    },
    {
      id: 4,
      name: 'América del Norte',
      description: 'Ciudades icónicas y una gran diversidad natural.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070',
    },
    {
      id: 5,
      name: 'América del Sur',
      description: 'Cultura vibrante, selvas y maravillas naturales.',
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2076',
    },
    {
      id: 6,
      name: 'Oceanía',
      description: 'Islas paradisíacas y aventuras increíbles.',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070',
    },
  ];
}
