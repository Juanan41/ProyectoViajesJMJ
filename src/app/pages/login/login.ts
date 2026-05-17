import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';

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

    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!email || !password) {
      this.errorMessage.set('Introduce tu correo electrónico y contraseña.');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.errorMessage.set('Introduce un correo electrónico válido.');
      return;
    }

    this.isLoading.set(true);

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.getLoginErrorMessage(err));
      },
    });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private getLoginErrorMessage(err: any): string {
    const backendMessage = this.extractBackendMessage(err);

    if (backendMessage) {
      return backendMessage;
    }

    if (err?.status === 0) {
      return 'No se pudo conectar con el servidor. Comprueba que el backend esté abierto.';
    }

    if (err?.status === 401 || err?.status === 403) {
      return 'Correo electrónico o contraseña incorrectos.';
    }

    return 'No se pudo iniciar sesión. Inténtalo de nuevo más tarde.';
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
