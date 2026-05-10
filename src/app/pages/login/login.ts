import { Component } from '@angular/core';
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

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert('Error al iniciar sesión'),
    });
  }

  private getUserNameFromEmail(email: string): string {
    const emailStart = email.split('@')[0];
    const cleanName = emailStart.replace(/[^a-zA-Z]/g, ' ').trim();

    if (!cleanName) return 'Usuario';

    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  }
}
