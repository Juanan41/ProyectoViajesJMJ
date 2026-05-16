// ProyectoViajesJMJ - pages\register\register.ts
// Responsabilidad: autenticacion, autorizacion y control de sesion.
// Nota profesional: Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Documento profesional: clase principal del archivo.
 * Gestiona autenticacion y sesion; los cambios aqui afectan al acceso de usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './register.html',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this.isLoading()) {
      return;
    }

    this.errorMessage.set('');

    const name = this.name.trim();
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    if (!name || !email || !password || !confirmPassword) {
      this.errorMessage.set('Completa todos los campos para crear tu cuenta.');
      return;
    }

    if (name.length < 3) {
      this.errorMessage.set('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.errorMessage.set('Introduce un correo electrónico válido.');
      return;
    }

    if (password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.isLoading.set(true);

    const payload = {
      username: name,
      email,
      password,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.authService.login({ email, password }).subscribe({
          next: () => {
            this.isLoading.set(false);
            this.router.navigate(['/']);
          },
          error: () => {
            this.isLoading.set(false);
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.getRegisterErrorMessage(err));
      },
    });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private getRegisterErrorMessage(err: any): string {
    const backendMessage = this.extractBackendMessage(err);

    if (backendMessage) {
      return backendMessage;
    }

    if (err?.status === 0) {
      return 'No se pudo conectar con el servidor. Comprueba que el backend esté abierto.';
    }

    if (err?.status === 409) {
      return 'Ya existe una cuenta con ese correo electrónico.';
    }

    if (err?.status === 400) {
      return 'Revisa los datos introducidos e inténtalo de nuevo.';
    }

    return 'No se pudo crear la cuenta. Inténtalo de nuevo más tarde.';
  }

  private extractBackendMessage(err: any): string {
    if (typeof err?.error === 'string') {
      return err.error;
    }

    if (err?.error?.message) {
      return err.error.message;
    }

    if (err?.error?.detail) {
      return err.error.detail;
    }

    return '';
  }
}
