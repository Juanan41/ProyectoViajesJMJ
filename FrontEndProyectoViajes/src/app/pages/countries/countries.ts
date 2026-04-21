import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  getContinentById,
  getCountriesByContinent,
  Continent,
  Country,
} from '../../data/destinations';
import { LucideAngularModule, ArrowLeft, ChevronRight, MapPin } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  route = inject(ActivatedRoute);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly MapPinIcon = MapPin;

  continent: Continent | undefined;
  countries: Country[] = [];

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

  getFlagUrl(countryId: string): string {
    const code = this.flagMap[countryId];
    return code ? `https://flagcdn.com/w40/${code}.png` : '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const continentId = params.get('continentId');
      if (continentId) {
        this.continent = getContinentById(continentId);
        this.countries = getCountriesByContinent(continentId);
      }
    });
  }
}
