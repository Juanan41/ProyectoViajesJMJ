import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinoCarousel } from '../../components/destino-carousel/destino-carousel';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DestinoCarousel, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService = inject(Auth);
  router = inject(Router);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get user() {
    return this.authService.user();
  }
}
