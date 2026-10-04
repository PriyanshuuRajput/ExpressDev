import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.less',
})
export class HeroSectionComponent {}
