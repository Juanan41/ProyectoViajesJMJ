import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { PantallaCargaComponent } from './components/pantalla_carga/pantalla_carga';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, PantallaCargaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  protected readonly title = signal('jmj-frontend');

  mostrarPantallaCarga = signal(true);

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.comprobarBackend();
  }

  private comprobarBackend(): void {
    this.http.get(`${environment.apiUrl}/destinos`).subscribe({
      next: () => {
        this.ocultarPantallaCarga();
      },
      error: () => {
        setTimeout(() => {
          this.ocultarPantallaCarga();
        }, 8000);
      }
    });
  }

  private ocultarPantallaCarga(): void {
    setTimeout(() => {
      this.mostrarPantallaCarga.set(false);
    }, 2500);
  }

}
