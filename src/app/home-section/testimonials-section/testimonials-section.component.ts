import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as Content from '../../content';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.less',
})
export class TestimonialsSectionComponent {
  readonly testimonials = Content.QUOTES;
}
