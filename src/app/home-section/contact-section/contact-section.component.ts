import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import * as Content from '../../content';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.less',
})
export class ContactSectionComponent {
  readonly services = Content.SERVICES;
  readonly sent = signal(false);
  readonly model = { name: '', email: '', service: '', details: '' };

  submit(valid: boolean | null): void {
    if (valid) {
      this.sent.set(true);
    }
  }
}
