import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { continents } from '../../data/destinations';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-continents',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './continents.html',
  styleUrl: './continents.css',
})
export class Continents {
  continents = continents;
  readonly ChevronRightIcon = ChevronRight;
}
