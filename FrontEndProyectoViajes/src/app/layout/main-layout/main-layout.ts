import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  authService = inject(Auth);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get user() {
    return this.authService.user();
  }

  get credits() {
    return this.authService.credits();
  }

  handleLogout() {
    this.authService.logout();
  }

  handleUpdateCredits(amount: number) {
    this.authService.updateCredits(amount);
  }
}
