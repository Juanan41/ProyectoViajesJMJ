import { Component, Input, ViewChild, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DestinoDTO } from '../../services/destino.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-destino-carousel',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LucideAngularModule],
  templateUrl: './destino-carousel.html',
  styleUrl: './destino-carousel.css',
})
export class DestinoCarousel implements OnInit, OnDestroy {
  @Input() destinos: DestinoDTO[] = [];
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  private router = inject(Router);
  private intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => this.next(), 5000);
  }

  next() {
    if (!this.carouselRef) return;
    const el = this.carouselRef.nativeElement;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
    }
  }

  prev() {
    if (!this.carouselRef) return;
    const el = this.carouselRef.nativeElement;
    if (el.scrollLeft <= 10) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
    }
  }

  goToDestination(dest: DestinoDTO) {
    this.router.navigate(['/hotels', dest.id]);
  }
}
