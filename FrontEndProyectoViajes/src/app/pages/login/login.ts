import { Component, inject } from '@angular/core';
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
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;

  authService = inject(Auth);
  router = inject(Router);

  handleSubmit(event: Event) {
    event.preventDefault();

    if (!this.email || !this.password) {
      this.error = 'Introduce correo y contraseña';
      return;
    }

    this.error = '';
    this.loading = true;

    this.authService.login({
      email: this.email,
      password: this.password,
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Correo o contraseña incorrectos';
        console.error('Error de login:', err);
      }
    });
  }
}
