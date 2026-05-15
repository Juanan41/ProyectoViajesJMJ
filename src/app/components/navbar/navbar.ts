import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation';
import {
  LucideAngularModule,
  User,
  LogOut,
  MapPin,
  Search,
  Wallet,
  Settings,
  LayoutDashboard,
  X,
  Plus,
  Minus,
} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe, LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  public auth = inject(Auth);
  private router = inject(Router);
  public translationService = inject(TranslationService);
  private elementRef = inject(ElementRef);

  searchQuery = '';
  isDialogOpen = false;
  amount = '';
  isUserMenuOpen = false;
  balanceNotice = '';

  private noticeTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly UserIcon = User;
  readonly LogOutIcon = LogOut;
  readonly MapIcon = MapPin;
  readonly SearchIcon = Search;
  readonly WalletIcon = Wallet;
  readonly SettingsIcon = Settings;
  readonly LayoutDashboardIcon = LayoutDashboard;
  readonly XIcon = X;
  readonly PlusIcon = Plus;
  readonly MinusIcon = Minus;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }

  getUserAvatarUrl(): string {
    return this.auth.user()?.avatarUrl?.trim() || '';
  }

  toggleLanguage() {
    const current = this.translationService.currentLang();
    this.translationService.setLanguage(current === 'es' ? 'en' : 'es');
  }

  handleSearch(event: Event) {
    event.preventDefault();

    if (this.searchQuery.trim()) {
      this.router.navigate(['/search-results'], {
        queryParams: { q: this.searchQuery },
      });

      this.searchQuery = '';
    }
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.isUserMenuOpen = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  handleDeposit() {
    const val = parseFloat(this.amount);

    if (val > 0) {
      this.auth.updateCredits(val);
      this.showBalanceNotice('Saldo ingresado correctamente');
      this.amount = '';
      this.isDialogOpen = false;
    }
  }

  handleWithdraw() {
    const val = parseFloat(this.amount);

    if (val > 0 && val <= (this.auth.user()?.saldo || 0)) {
      this.auth.updateCredits(-val);
      this.showBalanceNotice('Saldo retirado correctamente');
      this.amount = '';
      this.isDialogOpen = false;
    }
  }

  private showBalanceNotice(message: string): void {
    this.balanceNotice = message;

    if (this.noticeTimeout) {
      clearTimeout(this.noticeTimeout);
    }

    this.noticeTimeout = setTimeout(() => {
      this.balanceNotice = '';
      this.noticeTimeout = null;
    }, 3000);
  }
}
