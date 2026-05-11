import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';

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

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage.set('');

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage.set('Todos los campos son obligatorios.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.isLoading.set(true);

    const payload = {
      username: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.authService.login({ email: this.email, password: this.password }).subscribe({
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
        if (err.error && typeof err.error === 'string') {
          this.errorMessage.set(err.error);
        } else if (err.error && err.error.message) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set('No se pudo crear la cuenta. El correo podría estar en uso.');
        }
      },
    });
  }
}
