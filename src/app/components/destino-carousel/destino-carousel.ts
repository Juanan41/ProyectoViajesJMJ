import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LucideAngularModule, MapPin } from 'lucide-angular';
import { DestinoDTO } from '../../services/destino.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-destino-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './destino-carousel.html',
})
export class DestinoCarousel implements AfterViewInit, OnDestroy {
  @Input() destinos: DestinoDTO[] = [];
  @ViewChild('carousel') carousel!: ElementRef;
  readonly MapPinIcon = MapPin;
  private autoPlayInterval: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, 4000);
    }
  }

  ngOnDestroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  next() {
    if (!this.carousel) return;
    const el = this.carousel.nativeElement;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
    }
  }

  prev() {
    if (!this.carousel) return;
    const el = this.carousel.nativeElement;
    el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
  }

  goToDestination(dest: DestinoDTO) {
    if (dest.id) {
      this.router.navigate(['/hotels', dest.id]);
    }
  }
}
