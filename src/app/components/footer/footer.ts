import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

type FooterModal = 'privacy' | 'terms' | 'contact' | null;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './footer.html',
})
export class Footer {
  activeModal = signal<FooterModal>(null);

  openModal(modal: Exclude<FooterModal, null>) {
    this.activeModal.set(modal);
  }

  closeModal() {
    this.activeModal.set(null);
  }
}
