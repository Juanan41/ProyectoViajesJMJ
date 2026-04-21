import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, CreditCard, Camera, Trash2 } from 'lucide-angular';
import { Auth } from '../../services/auth';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  authService = inject(Auth);

  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  readonly CreditCardIcon = CreditCard;
  readonly CameraIcon = Camera;
  readonly Trash2Icon = Trash2;

  name = '';
  email = '';
  password = '';
  saved = false;

  get user() {
    return this.authService.user();
  }

  get cards() {
    return this.authService.cards();
  }

  ngOnInit(): void {
    const u = this.user;
    if (u) {
      this.name = u.name || '';
      this.email = u.email || '';
    }
  }

  handleSave(event: Event) {
    event.preventDefault();
    this.authService.updateUser({ name: this.name, email: this.email });
    this.saved = true;
    setTimeout(() => (this.saved = false), 3000);
  }

  triggerFileInput() {
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.click();
    }
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.authService.updateUser({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  removeCard(id: string) {
    // In a real app we'd call a service to remove the card
    this.authService.cards.update((cards) => cards.filter((c) => c.id !== id));
  }
}
