import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Plane,
  Search,
  User,
  LogOut,
  Wallet,
  Settings,
  X,
  Plus,
  Minus,
  MapPin,
  Briefcase,
} from 'lucide-angular';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation';

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() isLoggedIn = false;
  @Input() user: UserData | null = null;
  @Input() credits = 0;
  @Input() isAdmin = false;

  @Output() loginEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() updateCreditsEvent = new EventEmitter<number>();

  amount = '';
  isDialogOpen = false;
  searchQuery = '';
  isUserMenuOpen = false;

  readonly PlaneIcon = Plane;
  readonly SearchIcon = Search;
  readonly UserIcon = User;
  readonly LogOutIcon = LogOut;
  readonly WalletIcon = Wallet;
  readonly SettingsIcon = Settings;
  readonly XIcon = X;
  readonly PlusIcon = Plus;
  readonly MinusIcon = Minus;
  readonly MapPinIcon = MapPin;
  readonly BriefcaseIcon = Briefcase;

  constructor(
    private router: Router,
    public translationService: TranslationService,
  ) {}

  toggleLanguage() {
    const current = this.translationService.currentLang();
    this.translationService.setLanguage(current === 'es' ? 'en' : 'es');
  }

  handleSearch(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
      this.searchQuery = '';
    }
  }

  parseAmount() {
    return parseFloat(this.amount) || 0;
  }

  handleDeposit() {
    const val = parseFloat(this.amount);
    if (!isNaN(val) && val > 0) {
      this.updateCreditsEvent.emit(val);
      this.amount = '';
      this.isDialogOpen = false;
    }
  }

  handleWithdraw() {
    const val = parseFloat(this.amount);
    if (!isNaN(val) && val > 0 && this.credits >= val) {
      this.updateCreditsEvent.emit(-val);
      this.amount = '';
      this.isDialogOpen = false;
    }
  }

  toggleUserMenu(eventOrOpen?: Event | boolean) {
    if (eventOrOpen instanceof Event) {
      eventOrOpen.stopPropagation();
      this.isUserMenuOpen = !this.isUserMenuOpen;
    } else {
      this.isUserMenuOpen = eventOrOpen !== undefined ? eventOrOpen : !this.isUserMenuOpen;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]).then(() => {
      this.toggleUserMenu(false);
    });
  }
}
