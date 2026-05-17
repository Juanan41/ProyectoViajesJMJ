import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Continents } from './pages/continents/continents';
import { Countries } from './pages/countries/countries';
import { Cities } from './pages/cities/cities';
import { Hotels } from './pages/hotels/hotels';
import { HotelComponent } from './pages/hotel/hotel';
import { Trips } from './pages/trips/trips';
import { Profile } from './pages/profile/profile';
import { Settings } from './pages/settings/settings';
import { Receipt } from './pages/receipt/receipt';
import { SearchResults } from './pages/search-results/search-results';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminDashboard } from './pages/admin/admin-dashboard';
import { AddCard } from './pages/add-card/add-card';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'continents', component: Continents },
  { path: 'continent/:id', component: Countries },
  { path: 'countries/:country', component: Cities },


  { path: 'hotels/destino/:destinoId', component: Hotels },

  
  { path: 'hotels/:id', component: Hotels },

  { path: 'hotel/:id', component: HotelComponent },
  { path: 'trips', component: Trips, canActivate: [AuthGuard] },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'settings', component: Settings, canActivate: [AuthGuard] },
  { path: 'add-card', component: AddCard, canActivate: [AuthGuard] },
  { path: 'receipt/:id', component: Receipt, canActivate: [AuthGuard] },
  { path: 'search-results', component: SearchResults },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin', component: AdminDashboard, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
