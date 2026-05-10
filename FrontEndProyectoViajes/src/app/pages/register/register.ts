import { Component } from '@angular/core';
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

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  async handleSubmit(event: Event) {
    event.preventDefault();
    if (this.password !== this.confirmPassword) return;

    const payload = {
      username: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.authService.login({ email: this.email, password: this.password }).subscribe(() => {
          this.router.navigate(['/']);
        });
      },
      error: (err) => alert('Error en el registro'),
    });
  }
}
