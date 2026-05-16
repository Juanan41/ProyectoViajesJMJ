// ProyectoViajesJMJ - app.config.ts
// Responsabilidad: estructura global de navegacion, layout y composicion de la aplicacion.
// Nota profesional: Forma parte de la estructura base de la aplicacion y se renderiza en multiples pantallas.

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
};
