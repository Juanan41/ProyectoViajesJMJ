import { Routes } from '@angular/router';

import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { Settings } from './pages/settings/settings';
import { AddCard } from './pages/add-card/add-card';
import { HotelComponent } from './pages/hotel/hotel';
import { SearchResults } from './pages/search-results/search-results';
import { Continents } from './pages/continents/continents';
import { Countries } from './pages/countries/countries';
import { Cities } from './pages/cities/cities';
import { Hotels } from './pages/hotels/hotels';
import { Receipt } from './pages/receipt/receipt';
import { Trips } from './pages/trips/trips';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home, title: 'JMJ Viajes' },
      { path: 'login', component: Login, title: 'Iniciar Sesión | JMJ Viajes' },
      { path: 'register', component: Register, title: 'Registro | JMJ Viajes' },
      { path: 'profile', component: Profile, title: 'Mi Perfil | JMJ Viajes' },
      { path: 'settings', component: Settings, title: 'Ajustes | JMJ Viajes' },
      { path: 'add-card', component: AddCard, title: 'Añadir Tarjeta | JMJ Viajes' },
      { path: 'hotel/:id', component: HotelComponent, title: 'Hotel | JMJ Viajes' },
      { path: 'search', component: SearchResults, title: 'Buscar | JMJ Viajes' },
      { path: 'continents', component: Continents, title: 'Continentes | JMJ Viajes' },
      { path: 'continent/:continentId', component: Countries, title: 'Países | JMJ Viajes' },
      { path: 'country/:countryId', component: Cities, title: 'Ciudades | JMJ Viajes' },
      { path: 'city/:cityId', component: Hotels, title: 'Hoteles | JMJ Viajes' },
      { path: 'receipt/:hotelId', component: Receipt, title: 'Recibo | JMJ Viajes' },
      { path: 'trips', component: Trips, title: 'Mis Viajes | JMJ Viajes' },

      // CMS / Panel de administración
      { path: 'admin', component: AdminDashboard, title: 'Panel Admin | JMJ Viajes' },
      { path: 'admin/users', component: AdminDashboard, title: 'Gestión de Usuarios | JMJ Viajes' },
    ],
  },
  { path: '**', redirectTo: '' },
];
