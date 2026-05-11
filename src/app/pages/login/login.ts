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

  async handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) {
      this.errorMessage.set('Por favor, completa todos los campos.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.error && typeof err.error === 'string') {
          this.errorMessage.set(err.error);
        } else if (err.error && err.error.message) {
          this.errorMessage.set(err.error.message);
        } else if (err.status === 401 || err.status === 403) {
          this.errorMessage.set('Credenciales incorrectas. Vuelve a intentarlo.');
        } else {
          this.errorMessage.set('Error de conexión con el servidor.');
        }
      },
    });
  }
}
