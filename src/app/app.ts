// ProyectoViajesJMJ - app.ts
// Responsabilidad: estructura global de navegacion, layout y composicion de la aplicacion.
// Nota profesional: Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

/**
 * Documento profesional: clase principal del archivo.
 * Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
