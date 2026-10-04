import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.less',
})
export class TopBarComponent {
  readonly menuOpen = signal(false);
  readonly links = [
    ['Services', '#services'],
    ['Work', '#work'],
    ['Process', '#process'],
    ['Pricing', '#pricing'],
    ['FAQ', '#faq'],
  ];
}
