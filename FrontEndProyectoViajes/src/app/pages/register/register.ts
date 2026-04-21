import { Component, inject } from '@angular/core';
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
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  authService = inject(Auth);
  router = inject(Router);

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden. Inténtalo de nuevo.';
      return;
    }

    if (!this.name || !this.email || !this.password) {
      this.error = 'Debes rellenar todos los campos';
      return;
    }

    this.error = '';

    this.authService.register({
      username: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.authService.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: () => this.router.navigate(['/']),
          error: () => this.router.navigate(['/login'])
        });
      },
      error: () => {
        this.error = 'No se pudo registrar el usuario';
      }
    });
  }
}
