// ProyectoViajesJMJ - layout\main-layout\main-layout.ts
// Responsabilidad: estructura global de navegacion, layout y composicion de la aplicacion.
// Nota profesional: Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.

import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { Auth } from '../../services/auth';

/**
 * Documento profesional: clase principal del archivo.
 * Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.
 */
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

  get isAdmin() {
    return this.authService.isCurrentUserAdmin();
  }

  handleLogout() {
    this.authService.logout();
  }

  handleUpdateCredits(amount: number) {
    this.authService.updateCredits(amount);
  }
}
