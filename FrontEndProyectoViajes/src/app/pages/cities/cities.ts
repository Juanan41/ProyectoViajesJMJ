import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { getCountryById, getCitiesByCountry, Country, City } from '../../data/destinations';
import { LucideAngularModule, ArrowLeft, MapPin } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './cities.html',
  styleUrl: './cities.css',
})
export class Cities implements OnInit {
  route = inject(ActivatedRoute);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly MapPinIcon = MapPin;

  country: Country | undefined;
  cities: City[] = [];

  private flagMap: Record<string, string> = {
    france: 'fr',
    spain: 'es',
    italy: 'it',
    uk: 'gb',
    germany: 'de',
    switzerland: 'ch',
    japan: 'jp',
    thailand: 'th',
    uae: 'ae',
    singapore: 'sg',
    india: 'in',
    usa: 'us',
    brazil: 'br',
    argentina: 'ar',
    mexico: 'mx',
    canada: 'ca',
    morocco: 'ma',
    egypt: 'eg',
    southafrica: 'za',
    australia: 'au',
    newzealand: 'nz',
  };

  getFlagUrl(countryId: string | undefined): string {
    if (!countryId) return '';
    const code = this.flagMap[countryId];
    return code ? `https://flagcdn.com/112x84/${code}.png` : '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const countryId = params.get('countryId');
      if (countryId) {
        this.country = getCountryById(countryId);
        this.cities = getCitiesByCountry(countryId);
      }
    });
  }
}
